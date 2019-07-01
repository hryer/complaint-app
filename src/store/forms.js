import { createStore } from 'libs/store-manager';
import persistor from 'libs/store-manager/persistor/rn-fetch-blob';
import uuid from 'libs/uuid';
import firebase from 'src/api/firebase';
import RNFetchBlob from 'rn-fetch-blob';

class FormsStore {
  get name() {
    return 'forms';
  }

  get defaultData() {
    return [];
  }

  get persistor() {
    return persistor;
  }

  get collectionName() {
    return 'sensor_labeling';
  }

  addItem(user, metadata) {
    const newForm = {
      id: uuid(),
      createdAt: (new Date()).getTime(),
      createdBy: user,
      updatedAt: null,
      deletedAt: null,
      metadata,
    };
    const newData = this.data.concat(newForm);
    this.setData(newData);
    return newForm.id;
  }

  editItem(user, id, metadata) {
    const index = this.getIndexById(id);
    if (index === -1) return;

    const newForm = Object.assign({}, this.data[index], {
      updatedAt: (new Date()).getTime(),
      updatedBy: user,
      metadata,
    });

    const newData = this.data.concat();
    newData[index] = newForm;
    this.setData(newData);
  }

  deleteItem(user, id) {
    const index = this.getIndexById(id);
    if (index === -1) return;

    const oldForm = this.data[index];
    const newData = this.data.concat();
    if (!oldForm.uploadedAt) {
      newData.splice(index, 1);
    } else {
      const newForm = Object.assign({}, oldForm, {
        deletedAt: (new Date()).getTime(),
        deletedBy: user,
      });
      newData[index] = newForm;
    }
    this.setData(newData);
  }

  getIndexById(id) {
    return this.data.findIndex(form => form.id === id);
  }

  getById(id) {
    return this.data[this.getIndexById(id)];
  }

  checkUploaded(form) {
    if (form.uploadedAt) {
      if (form.uploadedAt < form.updatedAt) {
        return false;
      } else if (form.uploadedAt < form.deletedAt) {
        return false;
      } else {
        return true;
      }
    } else {
      if (form.deletedAt) {
        return true;
      } else {
        return false;
      }
    }
  }

  getUnuploaded() {
    return this.data.filter(form => {
      return !this.checkUploaded(form);
    });
  }

  async uploadData(onProgress=(()=>{})) {
    const list = this.getUnuploaded();
    if (list.length === 0) return;

    let count = 0;
    let error;

    try {
      for (let item of list) {
        onProgress(count/list.length);

        const prevUploadedAt = item.uploadedAt;
        item.uploadedAt = (new Date()).getTime(); // intentionally in-place update

        try {
          await firebase.firestore()
            .collection(this.collectionName)
            .doc(item.id)
            .set(item, { merge: true });

          if (!item.deletedAt && item.metadata.foto) {
            const filename = `${this.collectionName}_${item.id}.jpg`;
            const photo = await RNFetchBlob.fs.readFile(`file://${item.metadata.foto}`, 'base64');
            await RNFetchBlob.fetch(
              'POST',
              `http://innov-tools.efishery.com/uploads`,
              {
                'Content-Type' : 'multipart/form-data',
              },
              [
                {
                  name : 'submit',
                  data : 'submit',
                },
                {
                  name: 'input_file',
                  type: 'image/jpeg',
                  filename,
                  data: photo,
                },
              ]
            );
          }

        } catch (err) {
          item.uploadedAt = prevUploadedAt;
          throw err;
        }

        count += 1;
      }

    } catch (err) {
      error = err;
    }

    if (count > 0) {
      const newData = this.data.concat();
      this.setData(newData);
    }
    if (error) {
      throw error;
    }
  }
}

export default createStore(FormsStore);
