import React from 'react';
import RN from 'react-native';
import PropTypes from 'prop-types';
import * as NB from 'native-base';
import * as NavigationService from 'libs/navigation/NavigationServices.js';
import moment from 'moment';
import Autocomplete from 'react-native-autocomplete-input';
import Loading from '../Loading';

const styles = RN.StyleSheet.create({
  autocompleteContainer: {
    backgroundColor: 'black',
    width: 150,
    zIndex: 1,
    borderColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    alignContent: 'flex-start'
  },
  autocompleteInput: {
    backgroundColor: '#039978',
  },
  autocompleteList: {
    backgroundColor: '#039978',
    color: '#ffffff'
  }
});
class AddComplaint extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      data: {
        user_id: '',
        feeder_barcode: '',
        category: '',
        subcategory: '',
        complaint: '',
        complaint_type: '',
        cause: '',
        troubleshoot: '',
        status: '',
        source: '',
        issued_at: moment().format('YYYY-MM-DD'),
        resolved_at: moment().format('YYYY-MM-DD'),
        cr: '',
        fo: ''
      },
      token: '',
      query: '',
      isEditable: true,
      customer_name: '',
      complaint_id: ''
    }
  }

  componentDidMount() {
    this.state.token = this.props.token;
    const { isConnected, requestGetOwners, screenComponent } = this.props;

    if (isConnected === true) {
      requestGetOwners({
        token: this.state.token
      });
    }

    if (screenComponent === 'Detail Complaint') {
      this.getInitialData();
    }
  }

  render() {
    const { dataOwner, dataBarcode, screenComponent, isConnected } = this.props;
    const { query, isEditable, customer_name, data } = this.state;
    const owners = this.findOwner(query);
    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

    if (dataOwner === null || dataOwner === 'undefined') {
      return <Loading />
    } else {
      return (
        <NB.Container>
          <NB.Header>
            <NB.Left>
              <NB.Button>
                <NB.Icon name="arrow-back" onPress={this.getLost} />
              </NB.Button>
            </NB.Left>
            <NB.Body>
              {
                (screenComponent === 'Detail Complaint' && isEditable === false)
                  ? <NB.Title>Edit Complaint</NB.Title>
                  : <NB.Title>{screenComponent}</NB.Title>
              }
            </NB.Body>
            <NB.Right />
          </NB.Header>

          <NB.Content>
            <NB.Form>
              <NB.Item stackedLabel>
                <NB.Label>Pilih Customer :</NB.Label>
                {
                  !isEditable
                    ? <NB.Input editable={isEditable}>{customer_name}</NB.Input>
                    : <RN.View style={styles.autocompleteContainer}>
                      <Autocomplete
                        containerStyle={styles.autocompleteInput}
                        autoCapitalize="none"
                        autoCorrect={false}
                        data={owners.length === 1 && comp(query, owners[0].name) ? [] : owners}
                        defaultValue={query}
                        onChangeText={value => this.setInput('query', value)}
                        renderItem={({ item, i }) => (
                          <RN.TouchableOpacity onPress={
                            async () => {
                              await this.setState(prevState => ({
                                ...prevState,
                                query: item.name,
                                customer_name: item.name,
                                data: {
                                  ...prevState.data,
                                  user_id: item.id
                                }
                              }));
                              await this.props.requestGetBarcodes({
                                token: this.state.token,
                                user_id: this.state.data.user_id
                              });
                            }
                          }>
                            <NB.Text style={styles.autocompleteList}>{item.name}</NB.Text>
                          </RN.TouchableOpacity>
                        )}
                        keyExtractor={item => item.id.toString()}
                      />
                    </RN.View>
                }
              </NB.Item>

              <NB.Item stackedLabel>
                <NB.Label>Masukan Kode Barcode Produk :</NB.Label>
                {
                  (dataBarcode != null && dataBarcode.length > 0 && isEditable && isConnected)
                    ? <NB.Item picker>
                      <NB.Picker
                        mode="dropdown"
                        iosIcon={<NB.Icon name="arrow-down" />}
                        style={{ width: undefined }}
                        placeholder="Pilih Kode Produk"
                        placeholderStyle={{ color: "#bfc6ea" }}
                        placeholderIconColor="#039978"
                        selectedValue={data.category}
                        onValueChange={value => this.setInput('feeder_barcode', value)}
                        editable={isEditable}
                      >
                        {
                          dataBarcode.map((data) => {
                            return <NB.Picker.Item key={data.barcode} label={data.barcode} value={data.barcode} />
                          })
                        }
                      </NB.Picker>
                    </NB.Item>
                    : <NB.Input
                      value={data.feeder_barcode}
                      onChangeText={value => this.setInput('feeder_barcode', value)}
                      editable={isEditable}
                    />
                }
              </NB.Item>

              <NB.Item stackedLabel>
                <NB.Label>Pilih Kategori :</NB.Label>
                {
                  !isEditable
                    ? <NB.Input editable={isEditable}>{data.category}</NB.Input>
                    : <NB.Item picker>
                      <NB.Picker
                        mode="dropdown"
                        iosIcon={<NB.Icon name="arrow-down" />}
                        style={{ width: undefined }}
                        placeholder="Pilih kategori"
                        placeholderStyle={{ color: "#bfc6ea" }}
                        placeholderIconColor="#039978"
                        selectedValue={data.category}
                        onValueChange={value => this.setInput('category', value)}
                        editable={isEditable}
                      >
                        <NB.Picker.Item label="Hardware" value="hardware" />
                        <NB.Picker.Item label="Software" value="software" />
                      </NB.Picker>
                    </NB.Item>
                }
              </NB.Item>

              <NB.Item stackedLabel>
                <NB.Label>Pilih Sub-Kategori :</NB.Label>
                {
                  !isEditable
                    ? <NB.Input editable={isEditable}>{data.subcategory}</NB.Input>
                    : <NB.Item picker>
                      <NB.Picker
                        mode="dropdown"
                        iosIcon={<NB.Icon name="arrow-down" />}
                        style={{ width: undefined }}
                        placeholder="Pilih kategori"
                        placeholderStyle={{ color: "#bfc6ea" }}
                        placeholderIconColor="#039978"
                        selectedValue={data.subcategory}
                        onValueChange={value => this.setInput('subcategory', value)}
                      >
                        <NB.Picker.Item label="Container" value="container" />
                        <NB.Picker.Item label="Feeder" value="feeder" />
                        <NB.Picker.Item label="Control Box" value="control box" />
                        <NB.Picker.Item label="Apps" value="apps" />
                        <NB.Picker.Item label="Dashboard" value="dashboard" />
                        <NB.Picker.Item label="Lainnya" value="lainnya" />
                      </NB.Picker>
                    </NB.Item>
                }
              </NB.Item>

              <NB.Item stackedLabel>
                <NB.Label>Pilih Status :</NB.Label>
                {
                  !isEditable
                    ? <NB.Input editable={isEditable}>{data.status}</NB.Input>
                    : <NB.Item picker>
                      <NB.Picker
                        mode="dropdown"
                        iosIcon={<NB.Icon name="arrow-down" />}
                        style={{ width: undefined }}
                        placeholder="Pilih kategori"
                        placeholderStyle={{ color: "#bfc6ea" }}
                        placeholderIconColor="#039978"
                        selectedValue={data.status}
                        onValueChange={value => this.setInput('status', value)}
                      >
                        <NB.Picker.Item label="Open" value="open" />
                        <NB.Picker.Item label="Resolved" value="resolved" />
                        <NB.Picker.Item label="Unresolved" value="unresolved" />
                        <NB.Picker.Item label="Pending" value="pending" />
                        <NB.Picker.Item label="Invalid" value="invalid" />
                      </NB.Picker>
                    </NB.Item>
                }
              </NB.Item>

              <NB.Item stackedLabel>
                <NB.Label>Komplain :</NB.Label>
                <NB.Input
                  value={data.complaint}
                  onChangeText={value => this.setInput('complaint', value)}
                  editable={isEditable}
                />
              </NB.Item>

              <NB.Item stackedLabel>
                <NB.Label>Tipe Komplain :</NB.Label>
                {
                  !isEditable
                    ? <NB.Input editable={isEditable}>{data.complaint_type}</NB.Input>
                    : <NB.Item picker>
                      <NB.Picker
                        mode="dropdown"
                        iosIcon={<NB.Icon name="arrow-down" />}
                        style={{ width: undefined }}
                        placeholder="Select your SIM"
                        placeholderStyle={{ color: "#bfc6ea" }}
                        placeholderIconColor="#039978"
                        selectedValue={data.complaint_type}
                        onValueChange={value => this.setInput('complaint_type', value)}
                      >
                        <NB.Picker.Item label="Failure" value="failure" />
                        <NB.Picker.Item label="Complaint" value="complaint" />
                        <NB.Picker.Item label="Maintenance" value="maintenance" />
                        <NB.Picker.Item label="Etc" value="etc" />
                      </NB.Picker>
                    </NB.Item>
                }
              </NB.Item>

              <NB.Item stackedLabel>
                <NB.Label>Penyebab :</NB.Label>
                <NB.Input
                  value={data.cause}
                  onChangeText={value => this.setInput('cause', value)}
                  editable={isEditable}
                />
              </NB.Item>

              <NB.Item stackedLabel>
                <NB.Label>Solusi :</NB.Label>
                <NB.Input
                  value={data.troubleshoot}
                  onChangeText={value => this.setInput('troubleshoot', value)}
                  editable={isEditable}
                />
              </NB.Item>

              <NB.Item stackedLabel>
                <NB.Label>Sumber :</NB.Label>
                <NB.Input
                  value={data.source}
                  onChangeText={value => this.setInput('source', value)}
                  editable={isEditable}
                />
              </NB.Item>

              <NB.Item stackedLabel>
                <NB.Label>Tanggal Kejadian :</NB.Label>
                {
                  !isEditable
                    ? <NB.Input editable={isEditable}>{data.issued_at}</NB.Input>
                    : <NB.DatePicker
                      defaultDate={new Date()}
                      maximumDate={new Date()}
                      locale={"id"}
                      timeZoneOffsetInMinutes={undefined}
                      modalTransparent={false}
                      animationType={"fade"}
                      androidMode={"default"}
                      placeHolderText="Pilih Tanggal"
                      textStyle={{ color: "green" }}
                      placeHolderTextStyle={{ color: "#d3d3d3" }}
                      onDateChange={value => this.setInput('issued_at', value)}
                      disabled={false}
                    />
                }
              </NB.Item>

              <NB.Item stackedLabel>
                <NB.Label>Tanggal Diselesaikan :</NB.Label>
                {
                  !isEditable
                    ? <NB.Input editable={isEditable}>{data.issued_at}</NB.Input>
                    : <NB.DatePicker
                      defaultDate={new Date()}
                      maximumDate={new Date()}
                      locale={"id"}
                      timeZoneOffsetInMinutes={undefined}
                      modalTransparent={false}
                      animationType={"fade"}
                      androidMode={"default"}
                      placeHolderText="Pilih Tanggal"
                      textStyle={{ color: "green" }}
                      placeHolderTextStyle={{ color: "#d3d3d3" }}
                      onDateChange={value => this.setInput('resolved_at', value)}
                      disabled={false}
                    />
                }
              </NB.Item>

              <NB.Item stackedLabel>
                <NB.Label>FO :</NB.Label>
                <NB.Input
                  value={this.state.data.fo}
                  onChangeText={value => this.setInput('fo', value)}
                  editable={isEditable}
                />
              </NB.Item>

              <NB.Item stackedLabel>
                <NB.Label>CR :</NB.Label>
                <NB.Input
                  value={this.state.data.cr}
                  onChangeText={value => this.setInput('cr', value)}
                  editable={isEditable}
                />
              </NB.Item>

              {
                !isEditable
                  ? <NB.Button block style={{ margin: 15 }}
                    onPress={() => this.setInput('isEditable', true)}>
                    <NB.Text>Edit</NB.Text>
                  </NB.Button>
                  : <NB.Button
                    block
                    style={{ margin: 15 }}
                    onPress={this.onSubmit}
                  >
                    <NB.Text>Save</NB.Text>
                  </NB.Button>
              }

            </NB.Form>
          </NB.Content>
        </NB.Container>
      )
    }
  }

  getInitialData = () => {
    const {
      customer,
      feeder_barcode,
      category, subcategory,
      complaint, complaint_type,
      cause, troubleshoot, status,
      source, issued_at, resolved_at,
      cr, fo, id
    } = this.props.detailData;

    this.setState(prevState => ({
      ...prevState,
      complaint_id: id,
      customer_name: customer.name,
      isEditable: false,
      data: {
        ...prevState.data,
        user_id: customer.id,
        feeder_barcode: feeder_barcode,
        category: category,
        subcategory: subcategory,
        complaint: complaint,
        complaint_type: complaint_type,
        cause: cause,
        troubleshoot: troubleshoot,
        status: status,
        source: source,
        issued_at: issued_at,
        resolved_at: resolved_at,
        cr: cr,
        fo: fo
      }
    }));
  }

  getLost = () => {
    NavigationService.goBack();
  }

  setInput = (name, value) => {
    if (name === 'query' || name === 'token' || name === 'isEditable') {
      this.setState({
        ...this.state,
        [name]: value
      });
    } else {
      if (name === 'issued_at' || name === 'resolved_at') {
        value = moment(value).format('YYYY-MM-DD');
      }
      this.setState({
        ...this.state,
        data: {
          ...this.state.data,
          [name]: value
        }
      });
      console.log(this.state.data);
    }
  }

  findOwner = (query) => {
    if (query === '') {
      return [];
    }
    const { dataOwner } = this.props;
    const regex = new RegExp(`${query.trim()}`, 'i');
    return dataOwner.filter(dataOwner => dataOwner.name.search(regex) >= 0);
  }

  findBarcode = () => {
    this.props.requestGetBarcodes({
      token: this.state.token,
      user_id: this.state.data.user_id
    });
  }

  submitValidation = () => {
    console.log('kontol');
    const { 
        user_id,
        feeder_barcode,
        category,
        subcategory,
        complaint,
        complaint_type,
        cause,
        troubleshoot,
        status,
        source,
        issued_at,
        resolved_at,
        cr,
        fo
    } = this.state.data;

    if(user_id === '' || feeder_barcode === '' || category === '' || subcategory === '' 
      || complaint === '' || complaint_type === '' || cause === '' || troubleshoot === '' 
      || status === '' || source === '' || issued_at === '' || resolved_at === '' || cr === '' || fo === '') {
        console.log(this.state.data);
        return false;
    }else {
      return true;
    }

  }

  onSubmit = () => {
    const checker = this.submitValidation();
    if(checker === false){
      alert('SEMUA DATA HARUS DI ISI!!!');
    }else {
      if (this.props.screenComponent === 'Add Complaint') {
        this.props.requestAddComplaint(this.state);
      } else {
        this.props.requestEditComplaint(this.state);
      }
  
      if(this.props.isConnected === false) {
        alert('Data akan terupload ketika koneksi online');
        NavigationService.goBack();
      }
    } 
  }
}

AddComplaint.propTypes = {
  isConnected: PropTypes.bool.isRequired
};

export default AddComplaint;

