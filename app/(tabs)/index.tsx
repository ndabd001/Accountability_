import { StyleSheet, Platform, TouchableOpacity, View, Image } from 'react-native';
import { useState, useEffect } from 'react';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { FlatList } from 'react-native-gesture-handler';

type Activity = {
  "Activity": string;
  "Category": string;
  "Category_Points_Lambda": number;
  "Date": string;
  "End_Time": number;
  "Notes": string;
  "Points": number;
  "Start_Time": number;
  "Tags": string;
  "activity_id": number;
}

type ActivityProps = {
  item: Activity;
  onPress: () => void;
  backgroundColor: string;
  textColor: string;
}

const Item = ({item, backgroundColor, textColor }:  ActivityProps) => (
  <View style={[styles.item, {backgroundColor}]}>
    <ThemedText style={[styles.title, {color: textColor}]}>{item.Activity}</ThemedText>
  </View>
);

export default function HomeScreen() {
  // usestate for setting a javascript
    // object for storing and using data
    const [data, setdata] = useState<Activity[]>();
    const [selectedId, setSelectedId] = useState<number>()

  // Using useEffect for single rendering
  useEffect(() => {
      // Using fetch to fetch the api from 
      // flask server it will be redirected to proxy
      fetch("http://127.0.0.1:8000/get-event-data").then((res) =>
          res.json().then((data) => {
              // Setting a data from api
              setdata(data);
              console.log(data)
          }).catch((error)=> {
            console.log(error);
          })
      );
  }, []);

  const renderItem = ({item}: {item: Activity}) => {
    const backgroundColor = item.activity_id === selectedId ? '#6e3b6e' : '#f9c2ff';
    const color = item.activity_id === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.activity_id)}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  }

  return (
  <View style={styles.mainContainer}>
    <View style={styles.avatarContainer}>
      <Image
        source={require('@/assets/images/A_simple_and_clean_outline_of_a_humanoid_figure_st.jpeg')}
        style={styles.image}
      />
    </View>
    <View style={styles.listContainer}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.activity_id.toString()}
        extraData={selectedId}
        initialNumToRender={2}
      />
    </View>
  </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  avatarContainer: {
    flex: 2
  },
  listContainer: {
    flex: 4,
    marginBottom: 20
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  image: {
    width: null,
    height: null,
    resizeMode: 'contain'
  }
});
