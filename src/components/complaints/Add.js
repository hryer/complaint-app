import React from 'react';
import RN from 'react-native';
import * as NB from 'native-base';
import * as NavigationService from 'libs/navigation/NavigationServices.js'
import moment from 'moment';
class AddComplaint extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      data : {
        user_id: '1',
        feeder_barcode: '00001-AL03005090R-SMIT',
        category: 'software',
        subcategory: 'feeder',
        complaint: 'aweawe',
        complaint_type: 'failure',
        cause: 'dadada',
        troubleshoot: 'qweqwe',
        status: 'open',
        source: 'WA',
        issued_at: moment().format('YYYY-MM-DD'),
        resolved_at: moment().format('YYYY-MM-DD')
      },
      token: ''
    }
    this.setDate = this.setDate.bind(this);
  }

  componentDidMount() {
    this.state.token = this.props.token;
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
              <NB.Input
                value={this.state.data.user_id}
                onChangeText={value => this.setInput('user_id', value)}
              />
            </NB.Item>

            <NB.Item stackedLabel>
              <NB.Label>Pilih Produk :</NB.Label>
              <NB.Input
                value={this.state.data.feeder_barcode}
                onChangeText={value => this.setInput('feeder_barcode', value)}
              />
            </NB.Item>

            <NB.Item stackedLabel>
              <NB.Label>Pilih Kategori :</NB.Label>

              <NB.ListItem>

                <NB.Radio
                  onPress={() => this.setInput('category','hardware')}
                  selected={this.state.data.category == 'hardware'} />
                <NB.Text>
                  Hardware
                    </NB.Text>
              </NB.ListItem>
              <NB.ListItem>
                <NB.Radio
                  onPress={() => this.setInput('category','software')}
                  selected={this.state.data.category == 'software'} />
                  <NB.Text>
                  Software
                </NB.Text>
              </NB.ListItem>
            </NB.Item>

            <NB.Item stackedLabel>
              <NB.Label>Pilih Sub-Kategori :</NB.Label>
              <NB.ListItem stackedLabel>
                <NB.Radio
                  onPress={() => this.setInput('subcategory','container')}
                  selected={this.state.data.subcategory == 'container'} />
                <NB.Text>
                  Container
                </NB.Text>
              </NB.ListItem>
              <NB.ListItem stackedLabel>
                <NB.Radio
                  onPress={() => this.setInput('subcategory','feeder')}
                  selected={this.state.data.subcategory == 'feeder'} />
                <NB.Text>
                  Feeder
                </NB.Text>
              </NB.ListItem>
              <NB.ListItem stackedLabel>
                <NB.Radio
                  onPress={() => this.setInput('subcategory','control box')}
                  selected={this.state.data.subcategory == 'control box'} />
                <NB.Text>
                  Control Box
                </NB.Text>
              </NB.ListItem>
              <NB.ListItem stackedLabel>
                <NB.Radio
                  onPress={() => this.setInput('subcategory','apps')}
                  selected={this.state.data.subcategory == 'apps'} />
                <NB.Text>
                  Apps
                </NB.Text>
              </NB.ListItem>
              <NB.ListItem stackedLabel>
                <NB.Radio
                  onPress={() => this.setInput('subcategory','dashboard')}
                  selected={this.state.data.subcategory == 'dashboard'} />
                <NB.Text>
                  Dashboard
                </NB.Text>
              </NB.ListItem>
              <NB.ListItem stackedLabel>
                <NB.Radio
                  onPress={() => this.setInput('subcategory','lainnya')}
                  selected={this.state.data.subcategory == 'lainnya'} />
                <NB.Text>
                  Lainnya
                </NB.Text>
              </NB.ListItem>
            </NB.Item>

            <NB.Item stackedLabel>
              <NB.Label>Pilih Status :</NB.Label>
              <NB.ListItem stackedLabel>
                <NB.Radio
                  onPress={() => this.setInput('status','open')}
                  selected={this.state.data.status == 'open'} />
                <NB.Text>
                  Open
                </NB.Text>
              </NB.ListItem>
              <NB.ListItem stackedLabel>
                <NB.Radio
                  onPress={() => this.setInput('status','resolved')}
                  selected={this.state.data.status == 'resolved'} />
                <NB.Text>
                  Resolved
                </NB.Text>
              </NB.ListItem>
              <NB.ListItem stackedLabel>
                <NB.Radio
                  onPress={() => this.setInput('status','unresolved')}
                  selected={this.state.data.status == 'unresolved'} />
                <NB.Text>
                  UnResolved
                </NB.Text>
              </NB.ListItem>
              <NB.ListItem stackedLabel>
                <NB.Radio
                  onPress={() => this.setInput('status','pending') }
                  selected={this.state.data.status == 'pending'} />
                <NB.Text>
                  Pending
                </NB.Text>
              </NB.ListItem>
              <NB.ListItem stackedLabel>
                <NB.Radio
                  onPress={value => this.setInput('status','invalid')}
                  selected={this.state.data.status == 'invalid'} />
                <NB.Text>
                  Invalid
                </NB.Text>
              </NB.ListItem>
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
                  selectedValue={this.state.complaint_type}
                  onValueChange={this.onSelectChange.bind(this)}
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
                onDateChange={this.setDate}
                disabled={false}
              />
              {/* <NB.Text>
                Date: {this.state.issued_at.toString()}
              </NB.Text> */}
            </NB.Item>
            {/* <NB.Text>{errMessage}</NB.Text> */}
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

  getLost = () => {
    NavigationService.goBack();
  }

  setDate(newDate) {
    newDate = moment(newDate).format('YYYY-MM-DD');
    this.setInput('issued_at', newDate);
  }

  setInput = (name, value) => {
    this.setState({
      ...this.state.data,
      [name]: value,
    });
  }

  onSelectChange = (value: string) => {
    this.setState({
      complaint_type: value
    });
  }

  onSubmit = () => {
    this.props.requestAddComplaint(this.state);
  }
}

export default AddComplaint;

