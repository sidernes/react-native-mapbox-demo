import React, {useEffect} from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import data from '../data/users.json';
import {
  Avatar,
  AvatarImage,
  Box,
  HStack,
  Heading,
  VStack,
  VirtualizedList,
} from '@gluestack-ui/themed';

interface User {
  id: string;
  fullName: string;
  timeStamp: string;
  recentText: string;
  avatarUrl: string;
}

interface Props {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
}

const ModalInfo = ({modalVisible, setModalVisible}: Props) => {
  const getItemCount = (data: User[]) => data.length;

  const getItem = (data: User[], index: number): User => data[index];

  return !data ? (
    <Text>Loading...</Text>
  ) : (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View
            style={{
              ...styles.modalView,
              // width:{width * 0.25},
              // height:{height * 0.3}
            }}>
            <Heading>Opiniones</Heading>
            <VirtualizedList
              data={data.data}
              initialNumToRender={4}
              getItemCount={() => getItemCount(data.data)}
              getItem={(data, index) => getItem(data, index)}
              keyExtractor={(item: User) => item.id}
              renderItem={({item}: {item: User}) => (
                <Box
                  borderBottomWidth="$1"
                  borderColor="$trueGray800"
                  sx={{
                    _dark: {
                      borderColor: '$trueGray100',
                    },
                    '@base': {
                      pl: 0,
                      pr: 0,
                    },
                    '@sm': {
                      pl: '$4',
                      pr: '$5',
                    },
                  }}
                  py="$2">
                  <HStack space="md" justifyContent="space-between">
                    <Avatar size="md">
                      <AvatarImage source={{uri: item.avatarUrl}} />
                    </Avatar>
                    <VStack>
                      <Text
                        color="$coolGray800"
                        fontWeight="$bold"
                        sx={{
                          _dark: {
                            color: '$warmGray100',
                          },
                        }}>
                        {item.fullName}
                      </Text>
                      <Text
                        color="$coolGray600"
                        sx={{
                          _dark: {
                            color: '$warmGray200',
                          },
                        }}>
                        {item.recentText}
                      </Text>
                    </VStack>
                    <Text
                      fontSize="$xs"
                      color="$coolGray800"
                      alignSelf="flex-start"
                      sx={{
                        _dark: {
                          color: '$warmGray100',
                        },
                      }}>
                      {item.timeStamp}
                    </Text>
                  </HStack>
                </Box>
              )}
            />
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    position: 'absolute',
    top: 80,
    left: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 20,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default ModalInfo;
