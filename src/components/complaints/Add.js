import React from 'react';
import RN from 'react-native';
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
    color: '#ffffff'
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
      data: this.getInitialData,
      token: '',
      query: ''
    }
  }

  componentDidMount() {
    this.state.token = this.props.token;
    const { isConnected, requestOwners } = this.props;

    if (isConnected === true) {
      requestOwners({
        token: this.state.token
      });
    }
  }
  /*
  TODO:: Add Design
    user_id: 1
feeder_barcode: 00002-AL03005090R-F3ot
category: software
status: pending
complaint: knknk
fo: vadadva
cr: adva
complaint_type: failure
cause: asdad
troubleshoot: asdqwf
source: asvasvda
subcategory[]: apps
issued_at: 2019-07-17T00:00:00.000+07:00
resolved_at: 2019-07-17T00:00:00.000+07:00
  */
  render() {
    const { dataOwner } = this.props;
    const { query } = this.state;
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
              <NB.Title>Add Complaint</NB.Title>
            </NB.Body>
            <NB.Right />
          </NB.Header>

          <NB.Content>
            <NB.Form>
              <NB.Item stackedLabel>
                <NB.Label>Pilih Customer :</NB.Label>
                {/* <NB.Input
                value={this.state.data.user_id}
                onChangeText={value => this.setInput('user_id', value)}
              /> */}
                <RN.View style={styles.autocompleteContainer}>
                  <Autocomplete
                    containerStyle={styles.autocompleteInput}
                    autoCapitalize="none"
                    autoCorrect={false}
                    data={owners.length === 1 && comp(query, owners[0].name) ? [] : owners}
                    defaultValue={query}
                    onChangeText={value => this.setInput('query', value)}
                    renderItem={({ item, i }) => (
                      <RN.TouchableOpacity onPress={
                        () => {
                          this.setInput('query', item.name);
                          this.setInput('user_id', item.id);
                        }
                      }>
                        <NB.Text style={styles.autocompleteList}>{item.name}</NB.Text>
                      </RN.TouchableOpacity>
                    )}
                    keyExtractor={item => item.id.toString()}
                  />
                </RN.View>

              </NB.Item>

              <NB.Item stackedLabel>
                <NB.Label>Masukan Kode Barcode Produk :</NB.Label>
                <NB.Input
                  value={this.state.data.feeder_barcode}
                  onChangeText={value => this.setInput('feeder_barcode', value)}
                />
              </NB.Item>

              <NB.Item stackedLabel>
                <NB.Label>Pilih Kategori :</NB.Label>
                <NB.Item picker>
                  <NB.Picker
                    mode="dropdown"
                    iosIcon={<NB.Icon name="arrow-down" />}
                    style={{ width: undefined }}
                    placeholder="Pilih kategori"
                    placeholderStyle={{ color: "#bfc6ea" }}
                    placeholderIconColor="#039978"
                    selectedValue={this.state.data.category}
                    onValueChange={value => this.setInput('category', value)}
                  >
                    <NB.Picker.Item label="Hardware" value="hardware" />
                    <NB.Picker.Item label="Software" value="software" />
                  </NB.Picker>
                </NB.Item>
              </NB.Item>

              <NB.Item stackedLabel>
                <NB.Label>Pilih Sub-Kategori :</NB.Label>
                <NB.Item picker>
                  <NB.Picker
                    mode="dropdown"
                    iosIcon={<NB.Icon name="arrow-down" />}
                    style={{ width: undefined }}
                    placeholder="Pilih kategori"
                    placeholderStyle={{ color: "#bfc6ea" }}
                    placeholderIconColor="#039978"
                    selectedValue={this.state.data.subcategory}
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
              </NB.Item>

              <NB.Item stackedLabel>
                <NB.Label>Pilih Status :</NB.Label>
                <NB.Item picker>
                  <NB.Picker
                    mode="dropdown"
                    iosIcon={<NB.Icon name="arrow-down" />}
                    style={{ width: undefined }}
                    placeholder="Pilih kategori"
                    placeholderStyle={{ color: "#bfc6ea" }}
                    placeholderIconColor="#039978"
                    selectedValue={this.state.data.status}
                    onValueChange={value => this.setInput('status', value)}
                  >
                    <NB.Picker.Item label="Open" value="open" />
                    <NB.Picker.Item label="Resolved" value="resolved" />
                    <NB.Picker.Item label="Unresolved" value="unresolved" />
                    <NB.Picker.Item label="Pending" value="pending" />
                    <NB.Picker.Item label="Invalid" value="invalid" />
                  </NB.Picker>
                </NB.Item>
              </NB.Item>

              <NB.Item stackedLabel>
                <NB.Label>Komplain :</NB.Label>
                <NB.Input
                  value={this.state.data.complaint}
                  onChangeText={value => this.setInput('complaint', value)}
                />
              </NB.Item>

              <NB.Item stackedLabel>
                <NB.Label>Tipe Komplain :</NB.Label>
                <NB.Item picker>
                  <NB.Picker
                    mode="dropdown"
                    iosIcon={<NB.Icon name="arrow-down" />}
                    style={{ width: undefined }}
                    placeholder="Select your SIM"
                    placeholderStyle={{ color: "#bfc6ea" }}
                    placeholderIconColor="#039978"
                    selectedValue={this.state.data.complaint_type}
                    onValueChange={value => this.setInput('complaint_type', value)}
                  >
                    <NB.Picker.Item label="Failure" value="failure" />
                    <NB.Picker.Item label="Complaint" value="complaint" />
                    <NB.Picker.Item label="Maintenance" value="maintenance" />
                    <NB.Picker.Item label="Etc" value="etc" />
                  </NB.Picker>
                </NB.Item>
              </NB.Item>

              <NB.Item stackedLabel>
                <NB.Label>Penyebab :</NB.Label>
                <NB.Input
                  value={this.state.data.cause}
                  onChangeText={value => this.setInput('cause', value)}
                />
              </NB.Item>

              <NB.Item stackedLabel>
                <NB.Label>Solusi :</NB.Label>
                <NB.Input
                  value={this.state.data.troubleshoot}
                  onChangeText={value => this.setInput('troubleshoot', value)}
                />
              </NB.Item>

              <NB.Item stackedLabel>
                <NB.Label>Sumber :</NB.Label>
                <NB.Input
                  value={this.state.data.source}
                  onChangeText={value => this.setInput('source', value)}
                />
              </NB.Item>

              <NB.Item stackedLabel>
                <NB.Label>Tanggal Kejadian :</NB.Label>
                <NB.DatePicker
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
              </NB.Item>

              <NB.Item stackedLabel>
                <NB.Label>Tanggal Diselesaikan :</NB.Label>
                <NB.DatePicker
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
              </NB.Item>
              <NB.Button
                block
                style={{ margin: 15 }}
                onPress={this.onSubmit}
              >
                <NB.Text>Submit</NB.Text>
              </NB.Button>
            </NB.Form>
          </NB.Content>
        </NB.Container>
      )
    }
  }

  getInitialData = () => {
    return {
      user_id: '1',
      feeder_barcode: '00001-AL03005090R-SMIT',
      category: '',
      subcategory: '',
      complaint: '',
      complaint_type: '',
      cause: '',
      troubleshoot: '',
      status: '',
      source: '',
      issued_at: moment().format('YYYY-MM-DD'),
      resolved_at: moment().format('YYYY-MM-DD')
    }
  }

  getLost = () => {
    NavigationService.goBack();
  }

  setInput = (name, value) => {
    if (name === 'query') {
      this.setState({
        [name]: value
      });
    } else {
      if (name === 'issued_at' || name === 'resolved_at') {
        value = moment(value).format('YYYY-MM-DD');
      }
      this.setState({
        data: {
          ...this.state.data,
          [name]: value
        }
      });
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
  onSubmit = () => {
    this.props.requestAddComplaint(this.state);
  }
}

export default AddComplaint;

