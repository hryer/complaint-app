import React from 'react';
import RN from 'react-native';
import * as NB from 'native-base';
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import RNFetchBlob from 'rn-fetch-blob';
import prompt from 'react-native-prompt-android';

import sensorApi from 'src/api/sensor';
import dashboardApi from 'src/api/dashboard';
import DataSensor from 'src/api/DataSensor';
import userStore from 'src/store/user';
import formsStore from 'src/store/forms';
import config from 'src/config';

const PACKAGE_NAME = 'com.sensortools';
const RNProgressDialog = RN.NativeModules.RNProgressDialog;
const Netw = RN.NativeModules.Netw;

let feederTokens = null;

export default class Labeling extends React.PureComponent {
  state = {
    step: 'STEP_INIT',
  }

  render() {
    return (
      <NB.Container>
        <NB.Header>
          <NB.Left>
            {
              (this.state.step === 'STEP_INIT' || this.state.isEdit) && (
                <NB.Button
                  transparent
                  onPress={() => this.props.navigation.goBack()}
                >
                  <NB.Icon name='arrow-back' />
                </NB.Button>
              )
            }
          </NB.Left>
          <NB.Body>
            <NB.Title>
              Labeling
              {
                this.state.step !== 'STEP_INIT' ? (
                  ` ${this.state.input_sensorId}`
                ) : (
                  ''
                )
              }
            </NB.Title>
          </NB.Body>
          <NB.Right />
        </NB.Header>

        <NB.Content>
          <NB.View style={styles.stepIndicators}>
            <NB.View style={styles.stepIndicator}>
              <NB.View style={[ styles.stepCircle, this.state.step === 'STEP_INIT' && styles.stepCircleActive ]} />
              <NB.Text style={[ styles.stepText, this.state.step === 'STEP_INIT' && styles.stepTextActive ]}>
                Konek
              </NB.Text>
            </NB.View>
            <NB.View style={styles.stepIndicator}>
              <NB.View style={[ styles.stepCircle, this.state.step === 'STEP_LABELING_START' && styles.stepCircleActive ]} />
              <NB.Text style={[ styles.stepText, this.state.step === 'STEP_LABELING_START' && styles.stepTextActive ]}>
                Start
              </NB.Text>
            </NB.View>
            <NB.View style={styles.stepIndicator}>
              <NB.View style={[ styles.stepCircle, this.state.step === 'STEP_LABELING_STOP' && styles.stepCircleActive ]} />
              <NB.Text style={[ styles.stepText, this.state.step === 'STEP_LABELING_STOP' && styles.stepTextActive ]}>
                Stop
              </NB.Text>
            </NB.View>
            <NB.View style={styles.stepIndicator}>
              <NB.View style={[ styles.stepCircle, this.state.step === 'STEP_INPUT_METADATA' && styles.stepCircleActive ]} />
              <NB.Text style={[ styles.stepText, this.state.step === 'STEP_INPUT_METADATA' && styles.stepTextActive ]}>
                Info
              </NB.Text>
            </NB.View>
          </NB.View>

          {
            this.state.step === 'STEP_INIT' && (
              <React.Fragment>
                <NB.Form>
                  <NB.Item stackedLabel>
                    <NB.Label>ID sensor :</NB.Label>
                    <NB.Input
                      value={this.state.input_sensorId || ''}
                      onChangeText={this.setInputSensorId}
                    />
                  </NB.Item>
                </NB.Form>
                <NB.Button block style={styles.margin15} onPress={this.nextStep}>
                  <NB.Text>Konek ke sensor</NB.Text>
                </NB.Button>

                <NB.View style={styles.margin15} />
                <NB.View style={styles.margin15} />
                <NB.View style={styles.margin15} />
                <NB.View style={styles.margin15} />

                <RN.View style={styles.margin15}>
                  <NB.Text>
                    Tombol di bawah ini hanya untuk developer
                  </NB.Text>
                </RN.View>
                <NB.Button block light style={styles.margin15} onPress={this.diagnostic}>
                  <NB.Text>Diagnostic</NB.Text>
                </NB.Button>
              </React.Fragment>
            )
          }

          {
            this.state.step === 'STEP_LABELING_START' && (
              <React.Fragment>
                <RN.View style={styles.margin15}>
                  <NB.Text>
                    Tekan tombol di bawah ini ketika ikan mulai/sedang makan
                  </NB.Text>
                </RN.View>
                <NB.Button block style={styles.margin15} onPress={this.nextStep}>
                  <NB.Text>Ikan mulai makan</NB.Text>
                </NB.Button>
                <NB.Button block light style={styles.margin15} onPress={this.showCancelDialog}>
                  <NB.Text>Batalkan dan keluar</NB.Text>
                </NB.Button>
              </React.Fragment>
            )
          }

          {
            this.state.step === 'STEP_LABELING_STOP' && (
              <React.Fragment>
                <RN.View style={styles.margin15}>
                  <NB.Text>
                    Tekan tombol di bawah ini ketika feeder seharusnya stop feeding
                  </NB.Text>
                </RN.View>
                <NB.Button block style={styles.margin15} onPress={this.nextStep}>
                  <NB.Text>Feeder seharusnya stop</NB.Text>
                </NB.Button>
                <NB.Button block light style={styles.margin15} onPress={this.showCancelDialog}>
                  <NB.Text>Batalkan dan keluar</NB.Text>
                </NB.Button>
              </React.Fragment>
            )
          }

          {
            this.state.step === 'STEP_INPUT_METADATA' && (
              <React.Fragment>
                <NB.Form>
                  <NB.Item stackedLabel>
                    <NB.Label>Kolam siapa, kolam apa :</NB.Label>
                    <NB.Input
                      value={this.state.input_pondInfo || ''}
                      onChangeText={value => this.setInput('pondInfo', value)}
                    />
                  </NB.Item>

                  <NB.Item stackedLabel>
                    <NB.Label>Komoditas :</NB.Label>
                    <NB.Input
                      value={this.state.input_komoditas || ''}
                      onChangeText={value => this.setInput('komoditas', value)}
                    />
                  </NB.Item>

                  <NB.Item stackedLabel>
                    <NB.Label>DoC :</NB.Label>
                    <NB.Input
                      keyboardType='numeric'
                      value={`${this.state.input_doc || ''}`}
                      onChangeText={value => this.setInput('doc', value)}
                    />
                  </NB.Item>

                  <NB.Item stackedLabel>
                    <NB.Label>Ukuran ikan (cm) :</NB.Label>
                    <NB.Input
                      keyboardType='numeric'
                      value={`${this.state.input_ukuranIkan || ''}`}
                      onChangeText={value => this.setInput('ukuranIkan', value)}
                    />
                  </NB.Item>

                  <NB.Item stackedLabel>
                    <NB.Label>Luas kolam (m²) :</NB.Label>
                    <NB.Input
                      keyboardType='numeric'
                      value={`${this.state.input_luasKolam || ''}`}
                      onChangeText={value => this.setInput('luasKolam', value)}
                    />
                  </NB.Item>

                  <NB.Item stackedLabel>
                    <NB.Label>Kedalaman (m) :</NB.Label>
                    <NB.Input
                      keyboardType='numeric'
                      value={`${this.state.input_kedalaman || ''}`}
                      onChangeText={value => this.setInput('kedalaman', value)}
                    />
                  </NB.Item>

                  <NB.Item stackedLabel>
                    <NB.Label>Jumlah ikan (ekor) :</NB.Label>
                    <NB.Input
                      keyboardType='numeric'
                      value={`${this.state.input_jumlahIkan || ''}`}
                      onChangeText={value => this.setInput('jumlahIkan', value)}
                    />
                  </NB.Item>

                  <NB.Item stackedLabel>
                    <NB.Label>Kepadatan (ekor/m³) :</NB.Label>
                    <NB.Input
                      keyboardType='numeric'
                      value={`${this.state.input_kepadatan || ''}`}
                      onChangeText={value => this.setInput('kepadatan', value)}
                    />
                  </NB.Item>

                  <NB.Item stackedLabel>
                    <NB.Label>Jarak horizontal feeder ke sensor (m) :</NB.Label>
                    <NB.Input
                      keyboardType='numeric'
                      value={`${this.state.input_jarakHorizontal || ''}`}
                      onChangeText={value => this.setInput('jarakHorizontal', value)}
                    />
                  </NB.Item>

                  <NB.Item stackedLabel>
                    <NB.Label>Jarak vertikal feeder ke sensor (m) :</NB.Label>
                    <NB.Input
                      keyboardType='numeric'
                      value={`${`${this.state.input_jarakVertikal || ''}`}`}
                      onChangeText={value => this.setInput('jarakVertikal', value)}
                    />
                  </NB.Item>
                </NB.Form>

                <NB.View style={styles.margin15}>
                  <NB.Text>
                    Foto
                  </NB.Text>
                  {
                    !this.state.input_foto ? (
                      null
                    ) : (
                      <RN.Image
                        style={styles.photo}
                        source={{uri: `file://${this.state.input_foto}` }}
                      />
                    )
                  }
                  <NB.View style={styles.inline}>
                    <NB.Button onPress={this.openImagePicker}>
                      <NB.Text>
                        {
                          !this.state.input_foto ? (
                            'Pilih Foto'
                          ) : (
                            'Ganti Foto'
                          )
                        }
                      </NB.Text>
                    </NB.Button>
                    <RN.View style={styles.width8} />
                    {
                      !this.state.input_foto ? (
                        null
                      ) : (
                        <NB.Button light onPress={() => this.setInput('foto', null)}>
                          <NB.Text>Hapus Foto</NB.Text>
                        </NB.Button>
                      )
                    }
                  </NB.View>
                </NB.View>

                <NB.Button block style={styles.margin15} onPress={this.save}>
                  <NB.Text>Save</NB.Text>
                </NB.Button>
                {
                  this.state.isEdit && (
                    <NB.Button block light style={styles.margin15} onPress={this.delete}>
                      <NB.Text>Delete</NB.Text>
                    </NB.Button>
                  )
                }
              </React.Fragment>
            )
          }
        </NB.Content>
      </NB.Container>
    );
  }

  componentDidMount() {
    RN.BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

    let id = this.props.navigation.getParam('id', null);
    const form = formsStore.getById(id);
    const newState = {};
    if (form) {
      const newState = {
        id,
        isEdit: true,
        step: 'STEP_INPUT_METADATA',
      };
      Object.entries(form.metadata).forEach(([ name, value ]) => {
        newState[`input_${name}`] = `${value || ''}`;
      });
      this.setState(newState);
    }
  }

  componentWillUnmount() {
    RN.BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    if (this.state.step !== 'STEP_INIT' && !this.state.isEdit) {
      return true;
    }
  }

  setInput = (name, value) => {
    this.setState({
      [`input_${name}`]: value,
    });
  }

  setInputSensorId = (value) => {
    this.setState({
      [`input_sensorId`]: (value || '').toUpperCase(),
    });
  }

  cancel = async () => {
    if (this._isLabeling) {
      try {
        await RNProgressDialog.show('Turning off sensor...');
        await sensorApi.stopLabeling(this.state.input_sensorId, config.sensorTokenSuper);
        await RNProgressDialog.dismiss();
      } catch (err) {
        console.log(err);
      }
    }
    this.props.navigation.goBack();
  }

  showCancelDialog = () => {
    RN.Alert.alert('Batalkan', 'Yakin mau keluar?', [
      {
        text: 'Stay di sini',
        onPress: () => {},
        style: 'cancel'
      },
      {
        text: 'Ya, keluar',
        onPress: () => this.cancel(),
      },
    ]);
  }

  diagnostic = () => {
    if ((this.state.input_sensorId || '').length !== 5) {
      alert('ID sensor harus 5 karakter');
      return;
    }

    RN.Alert.alert(
      'Diagnostic',
      'Mau ambil data atau mau set feeder?',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Set Feeder',
          onPress: this.setFeeder,
        },
        {
          text: 'Ambil Data',
          onPress: this.downloadData,
        },
      ]
    );
  }

  nextStep = async () => {
    switch (this.state.step) {
      case 'STEP_INIT': {
        if ((this.state.input_sensorId || '').length !== 5) {
          alert('ID sensor harus 5 karakter');
          return;
        }

        try {
          await RNProgressDialog.show('Checking...');
          const isConnected = await sensorApi.isConnectedToSensor(this.state.input_sensorId);
          if (!isConnected) {
            throw new Error(`Belum konek ke ${sensorApi.createSensorSsid(this.state.input_sensorId)}. Silakan konek manual. Apps ini harus konek manual agar tak terjadi error wifi.`);
          }
          await sensorApi.forceWifiUsage(true);

          await RNProgressDialog.show('Setting time...');
          await sensorApi.setTime(this.state.input_sensorId, config.sensorTokenSuper);

          await RNProgressDialog.show('Setting accelerometer...');
          await sensorApi.startLabeling(this.state.input_sensorId, config.sensorTokenSuper);
          this._isLabeling = true;

          await RNProgressDialog.dismiss();
          this.setState({ step: 'STEP_LABELING_START' });
        } catch (err) {
          console.log(err);
          await RNProgressDialog.dismiss();
          RN.Alert.alert('Ada error euy', err.message, [
            {
              text: 'Ok',
              style: 'cancel',
              onPress: () => {},
            },
          ]);
        }
        return;
      }

      case 'STEP_LABELING_START': {
        this._timeLabelingStart = (new Date()).getTime();
        await RNProgressDialog.show('Turning on sensor...');
        setTimeout(async () => {
          // ini memang sengaja bohongan untuk memberi action feedback
          await RNProgressDialog.dismiss();
          this.setState({ step: 'STEP_LABELING_STOP' });
        }, 1000);
        return;
      }

      case 'STEP_LABELING_STOP': {
        this._timeLabelingStop = (new Date()).getTime();
        await this.waitNegativeClass();
        this._timeLabelingEnd = (new Date()).getTime();

        try {
          const id = await this.saveMetadata();

          await RNProgressDialog.show('Turning off sensor...');
          await sensorApi.stopLabeling(this.state.input_sensorId, config.sensorTokenSuper);
          this._isLabeling = false;

          await RNProgressDialog.show('Downloading data...');
          const senMov = [];
          senMov.labelingTime = this._timeLabelingStart;
          await DataSensor.downloadAll(this.state.input_sensorId, config.sensorTokenSuper, senMov);

          await RNProgressDialog.dismiss();
          this.setState({
            id,
            step: 'STEP_INPUT_METADATA',
            input_senMovCount: senMov.length,
          });

        } catch (err) {
          console.log(err);
          await RNProgressDialog.dismiss();
          RN.Alert.alert('Ada error euy', err.message, [
            {
              text: 'Ok',
              onPress: () => this.cancel(),
            },
          ]);
        }
        return;
      }

      default: {
        // do nothing
      }
    }
  }

  waitNegativeClass = () => {
    return new Promise((resolve, reject) => {
      let timeWait = 10; // seconds
      const wait = async () => {
        await RNProgressDialog.show(`Tunggu ${timeWait} detik...`);
        timeWait -= 1;
        if (timeWait >= 0) {
          setTimeout(wait, 1000);
        } else {
          resolve();
        }
      };
      wait();
    });
  }

  openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      noData: true,
    };
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        // canceled
      } else if (response.error) {
        console.log(response.error)
        alert(response.error.message);
      } else {
        this.setInput('foto', response.path);
      }
    });
  }

  saveMetadata = async () => {
    const metadata = {
      timeStart: this._timeLabelingStart,
      timeStop: this._timeLabelingStop,
      timeEnd: this._timeLabelingEnd,
    };

    Object.entries(this.state).forEach(([ key, value ]) => {
      if (key.startsWith('input_')) {
        if (!isNaN(value)) {
          value = parseFloat(value);
        }
        const name = key.split('input_').pop();
        metadata[name] = value;
      }
    });

    if (metadata.foto) {
      if (metadata.foto.indexOf(PACKAGE_NAME) < 0) {
        const resized = await ImageResizer.createResizedImage(`file://${metadata.foto}`, 1280, 1280, 'JPEG', 90);
        const filename = resized.path.split('/').pop();
        const dir = `${RNFetchBlob.fs.dirs.DocumentDir}/foto`;
        const isDir = await RNFetchBlob.fs.isDir(dir);
        if (!isDir) {
          await RNFetchBlob.fs.mkdir(dir);
        }
        const newFoto = `${dir}/${filename}`;
        await RNFetchBlob.fs.cp(`file://${resized.path}`, newFoto);
        metadata.foto = newFoto;
      }
    }

    if (this.state.id) {
      formsStore.editItem(userStore.data, this.state.id, metadata);
      return this.state.id;
    } else {
      return formsStore.addItem(userStore.data, metadata);
    }
  }

  save = async () => {
    try {
      await RNProgressDialog.show('Menyimpan data...');
      await this.saveMetadata();
      await RNProgressDialog.dismiss();
      this.props.navigation.goBack();
    } catch (err) {
      console.log(err);
      await RNProgressDialog.dismiss();
      alert(err.message);
    }
  }

  delete = () => {
    RN.Alert.alert(`Mau hapus?`, 'Apakah yakin seyakin-yakinnya?', [
      {
        text: 'Cancel',
        style: 'cancel',
        onPress: () => {},
      },
      {
        text: 'Iya, hapus',
        onPress: async () => {
          try {
            await RNProgressDialog.show('Loading...');
            formsStore.deleteItem(userStore.data, this.state.id);
            if (this.state.input_foto) {
              try {
                await RNFetchBlob.fs.unlink(this.state.input_foto);
              } catch (err) {
                console.log(err);
              }
            }
            await RNProgressDialog.dismiss();
            this.props.navigation.goBack();
          } catch (err) {
            console.log(err);
            await RNProgressDialog.dismiss();
            alert(err.message);
          }
        },
      },
    ]);
  }

  downloadData = async () => {
    try {
      await RNProgressDialog.show('Checking...');
      const isConnected = await sensorApi.isConnectedToSensor(this.state.input_sensorId);
      if (!isConnected) {
        throw new Error(`Belum konek ke ${sensorApi.createSensorSsid(this.state.input_sensorId)}. Silakan konek manual. Apps ini harus konek manual agar tak terjadi error wifi.`);
      }
      await sensorApi.forceWifiUsage(true);

      await RNProgressDialog.show('Downloading sen_info...');
      await DataSensor.downloadInfo(this.state.input_sensorId, config.sensorTokenSuper);
      await RNProgressDialog.show('Downloading previous data...');
      await DataSensor.downloadAll(this.state.input_sensorId, config.sensorTokenSuper);

      await RNProgressDialog.dismiss();
      this.props.navigation.replace('DeveloperInfo', { page: 'logs' });
      RN.Alert.alert('Done', 'Done', [
        {
          text: 'Ok',
          style: 'cancel',
          onPress: () => {},
        },
      ]);

    } catch (err) {
      console.log(err);
      await RNProgressDialog.dismiss();
      alert(err.message);
    }
  }

  setFeeder = async () => {
    if (feederTokens === null) {
      try {
        await RNProgressDialog.show('Fetching feeder tokens...');
        await sensorApi.forceWifiUsage(false);
        await Netw.checkInternet();
        feederTokens = await dashboardApi.getTokens();
      } catch (err) {
        console.log(err);
        await RNProgressDialog.dismiss();
        alert(err.message);
        return;
      }
    }

    prompt(
      'Set Feeder',
      'Tulis ID feeder (contoh: untuk feeder efishery_01234 cukup tulis bagian 01234 saja)',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Lanjutkan',
          onPress: async (feederHex) => {
            try {
              feederHex = `${feederHex || ''}`;
              feederHex = feederHex.toUpperCase();
              if (feederHex.length !== 5) {
                alert('ID feeder harus 5 karakter');
                return;
              }
              const feederSsid = `efishery_${feederHex}`;

              const feederToken = feederTokens[feederSsid];
              if (!feederToken) {
                throw new Error(`Token untuk feeder ${feederSsid} tidak ada`);
              }

              await RNProgressDialog.show('Checking...');
              const isConnected = await sensorApi.isConnectedToSensor(this.state.input_sensorId);
              if (!isConnected) {
                throw new Error(`Belum konek ke ${sensorApi.createSensorSsid(this.state.input_sensorId)}. Silakan konek manual. Apps ini harus konek manual agar tak terjadi error wifi.`);
              }
              await sensorApi.forceWifiUsage(true);

              await RNProgressDialog.show(`Setting feeder ${feederSsid}...`);
              await sensorApi.setFeeder(this.state.input_sensorId, config.sensorTokenSuper, feederSsid, feederToken);

              await RNProgressDialog.dismiss();
              RN.Alert.alert('Done', 'Done', [
                {
                  text: 'Ok',
                  style: 'cancel',
                  onPress: () => {},
                },
              ]);

            } catch (err) {
              console.log(err);
              await RNProgressDialog.dismiss();
              alert(err.message);
            }
          },
        },
      ]
    );
  }
}

const styles = RN.StyleSheet.create({
  margin15: {
    margin: 15,
  },
  photo: {
    width: 200,
    height: 200,
    marginBottom: 8,
  },
  inline: {
    flexDirection: 'row',
  },
  width8: {
    width: 8,
  },

  stepIndicators: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
    marginBottom: 15,
  },
  stepIndicator: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  stepCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#aaa',
  },
  stepText: {
    color: '#aaa',
  },
  stepCircleActive: {
    backgroundColor: '#3F51B5',
  },
  stepTextActive: {
    color: '#3F51B5',
    fontWeight: 'bold',
  },
});
