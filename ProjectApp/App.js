import React from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Linking,
  TextInput,
} from "react-native";
import { Provider, Appbar, Card} from "react-native-paper";
import * as Contacts from "expo-contacts";
import { StatusBar } from 'expo-status-bar';
import Icon from "react-native-vector-icons/Entypo";
import { EvilIcons } from '@expo/vector-icons';

const SearchContact = () => {
  const [data, setData] = React.useState([]);
  const [fullData, setFullData] = React.useState([]);
  const [search, setSearch] = React.useState('');

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = fullData.filter(function (item) {
        const itemData = item.name
          ? item.name.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setData(newData);
      setSearch(text);
    } else {
      setData(fullData);
      setSearch(text);
    }
  };

  const handleClick = async (number) => {
    Linking.openURL(`tel:${number}`);
  };

  React.useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
        });
        setData(data);
        setFullData(data);
      }
    })();
  }, []);

  return (
    <Provider>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={() => {}}/>
        <Appbar.Content title="Daftar Kontak "/>
        <Appbar.Action icon="dots-vertical" onPress={() => {}}/>
      </Appbar.Header> 
      <TextInput
        style={styles.textInputStyle}
        onChangeText={(text) => searchFilterFunction(text)}
        value={search}
        // underlineColorAndroid="transparent"
        placeholder={"Cari di antara " + data.length + " Kontak"}
      />
      <StatusBar style="" />

      <View style={styles.mainbox}>
      
        <SafeAreaView style={styles.container}>
          <ScrollView style={styles.scrollView}>
            {data.map((l, i) => (
              <Card
                key={i}
                keyExtractor={(item, index) => index.toString()}
                style={styles.cardbox}
                onPress={() =>
                  handleClick(l.phoneNumbers ? l.phoneNumbers[0].number : "")
                }
              >
                <Card.Title
                  title={l.name}
                  left={(props) => (
                    <Icon
                      name="user"
                      style={styles.iconBox}
                      size={27}
                      color="#000000"
                    />
                  )}
                  // subtitle={l.phoneNumbers ? l.phoneNumbers[0].number : ""}
                />
              </Card>
            ))}
          </ScrollView>
        </SafeAreaView>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  mainbox: {
    textAlign: "center",
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 0,
    flex: 1,
    justifyContent: "space-between",
  },
  cardbox: {
    margin: 5,
    backgroundColor: '#DCDCDC',
  },
  header: {
    backgroundColor: "#5F9EA0",
    margin: 10,
  },
  textInputStyle: {
    height: 40,
    paddingLeft: 30,
    margin: 5,
    letterSpacing: 1.5,
    borderRadius: 6,
    backgroundColor: '#A9A9A9',
  },
  iconBox: {
    width: 50,
    height: 50,
    backgroundColor: "#008B8B",
    borderRadius: 100,
    paddingTop: 10,
    textAlign: "center",
  },
});
export default SearchContact;
