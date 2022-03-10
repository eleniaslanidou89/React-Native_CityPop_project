import React, { useState } from 'react'
import { View, Text, Button, TextInput, StyleSheet, Alert } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Title from './components/Title'
import Icon from 'react-native-vector-icons/FontAwesome'
// import {API_URL} from '../citypop-app-react-native/'
// import {API_username} from 'citypop-app-react-native\.env'
// import base64 from 'react-native-base64'

/* Home Section */
function HomeScreen({ navigation }) {
  return (
    <View>
      <Title />
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 20,
        }}
      >
        <Button
          style={styles.searchByCityButton}
          title="SEARCH BY CITY"
          onPress={() => navigation.navigate('SearchByCity')}
        />
      </View>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 20,
        }}
      >
        <Button
          style={styles.searchByCountryButton}
          title="SEARCH BY COUNTRY"
          onPress={() => navigation.navigate('SearchByCountry')}
        />
      </View>
    </View>
  )
}

/* Search By City Section */
function SearchByCity({ navigation, submitHandler }) {
  const [text, onChangeText] = useState('')

  const pressHandler = () => {
    SearchAPIcity(text)
  }

  const [population, setPopulation] = useState('Population')
  const [loading, setLoading] = useState(false)

  function SearchAPIcity(city = { text }) {
    // const API_username_b64='d2Vrbm93aXQ='
    // const API_username_b64 = base64.encode(API_username)
    setLoading(true)
    const API_URL = 'http://api.geonames.org/'
    // fetch(API_URL + 'searchJSON?q=' + city, {
    fetch(API_URL + 'searchJSON?name_equals=' + city + '&username=weknowit', {
      // method: 'GET'
      // ,
      // headers: {
      //    'Content-Type': 'application/json',
      //    Authorization: 'basic' + ' ' + API_username_b64,
      //    mode : 'cors'
      // },
    })
      .then((response) => response.json())
      .then((response) => {
        var geonames = response.geonames
        setPopulation(geonames[0].population)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => setLoading(false))
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={styles.title}>SEARCH BY CITY</Text>
      <TextInput
        style={styles.input}
        value={text}
        placeholder="Enter a city..."
        onChangeText={(val) => onChangeText(val)}
      />
      <View style={styles.searchButtonCityPopulation}>
        <Icon.Button
          name="search"
          backgroundColor="coral"
          onPress={pressHandler}
        >
          Loading population...
        </Icon.Button>
      </View>{' '}
      <TextInput
        style={styles.input}
        placeholder="population"
        value={population}
      />
      <View style={styles.homeButton}>
        <Icon.Button
          name="home"
          backgroundColor="coral"
          color="white"
          onPress={() => navigation.navigate('Home')}
        >
          HOME
        </Icon.Button>
      </View>
    </View>
  )
}

/* Search By Country Section */
function SearchByCountry({ navigation, submitHandler }) {
  const [text, onChangeText] = useState('')

  const pressHandler = () => {
    SearchAPIcity(text)
  }

  const [cityName, setCityName] = useState('Cities')
  const [loading, setLoading] = useState(false)

  function SearchAPIcity(country = { text }) {
    // const API_username_b64 = base64.encode(API_username)
    setLoading(true)
    const API_URL = 'http://api.geonames.org/'
    // fetch(API_URL + 'searchJSON?q=' + country, {
    fetch(API_URL + 'searchJSON?country=' + country + '&username=weknowit', {
      // method: 'GET'
      // ,
      // headers: {
      //    'Content-Type': 'application/json',
      //    Authorization: 'basic' + ' ' + API_username_b64,
      //    mode : 'cors'
      // },
    })
      .then((response) => response.json())
      .then((response) => {
        var geonames = response.geonames

        var cities = geonames.map(({ name: actualValue }) => actualValue)
        setCityName(cities)
      })
      .catch((err) => {
      })
      .finally(() => setLoading(false))
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={styles.title}>SEARCH BY COUNTRY</Text>
      <TextInput
        style={styles.input}
        value={text}
        placeholder="Enter a country..."
        onChangeText={(val) => onChangeText(val)}
      />
      <View style={styles.searchButtonCountryPopulation}>
        <Icon.Button
          name="search"
          backgroundColor="coral"
          onPress={pressHandler}
        >
          Loading cities...
        </Icon.Button>
      </View>
      <TextInput
        style={styles.input}
        placeholder="City Name"
        value={cityName}
      />
      <View style={styles.homeButton}>
        <Icon.Button
          name="home"
          backgroundColor="coral"
          color="white"
          onPress={() => navigation.navigate('Home')}
        >
          HOME
        </Icon.Button>
      </View>
    </View>
  )
}

const Stack = createNativeStackNavigator()

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SearchByCity" component={SearchByCity} />
        <Stack.Screen name="SearchByCountry" component={SearchByCountry} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    textAlign: 'center',
    color: 'grey',
    fontFamily: 'serif',
  },
  homeButton: {
    marginTop: 16,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    paddingLeft: 20,
    width: 200,
    borderColor: '#777',
    borderRadius: 20,
  },
  searchByCityButton: {
    paddingTop: 20,
  },
  searchByCountryButton: {
    paddingTop: 20,
  },
  searchButtonCityPopulation: {
    marginTop: 50,
  },
  searchButtonCountryPopulation: {
    marginTop: 50,
  },
  cityName: {
    flex: 1,
    height: 40,
    margin: 12,
    borderWidth: 1,
    paddingLeft: 20,
    width: 200,
    borderColor: '#777',
    borderRadius: 20,
  },
})

export default App
