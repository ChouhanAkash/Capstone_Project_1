import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Image,
} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import { useNavigation } from '@react-navigation/native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

const Profile = () => {
  const navigation = useNavigation();
  const [profile, setProfile] = useState({ phone: '', name: '', email: '', address: '' });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const savedData = await EncryptedStorage.getItem('key');
        if (savedData) {
          const parsed = JSON.parse(savedData);
          setProfile({
            phone: parsed.phone || '',
            name: parsed.name || '',
            email: parsed.email || '',
            address: parsed.address || '',
          });
        }
      } catch (e) {
        console.error('Error fetching profile:', e);
      }
    })();
  }, []);

  const handleSave = async () => {
    try {
      await EncryptedStorage.setItem('key', JSON.stringify(profile));
      Alert.alert('Profile updated');
      setEditMode(false);
    } catch (e) {
      Alert.alert('Failed to update');
    }
  };
  
    const handleLogout = async () => {
      try {
        const userData = await EncryptedStorage.getItem('key');
        const parsed = JSON.parse(userData);
        const loginType = parsed?.type || 'unknown';
  
        try {
          await auth().signOut();
        } catch (firebaseError) {
          console.warn('Firebase sign out failed:', firebaseError?.message);
        }
  
        if (loginType === 'google') {
          try {
            const isSignedIn = await GoogleSignin.isSignedIn();
            if (isSignedIn) {
              await GoogleSignin.signOut();
            }
          } catch (googleError) {
            console.warn('Google sign out failed:', googleError?.message);
          }
        }
  
        await EncryptedStorage.removeItem('key');
        navigation.replace('Login');
        Alert.alert('Logout Successful');
      } catch (error) {
        console.error('Logout Error:', error?.message);
        Alert.alert('Failed to logout. Try again.');
      }
    };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>My Profile</Text>

      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: 'https://www.w3schools.com/howto/img_avatar.png',
          }}
          style={styles.profileImage}
        />
      </View>

      <Text style={styles.label}>Phone:</Text>
      <TextInput
        style={[styles.input, !editMode && styles.disabledInput]}
        value={profile.phone}
        editable={editMode}
        onChangeText={(text) => setProfile({ ...profile, phone: text })}
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={[styles.input, !editMode && styles.disabledInput]}
        value={profile.name}
        editable={editMode}
        onChangeText={(text) => setProfile({ ...profile, name: text })}
      />

      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={[styles.input, !editMode && styles.disabledInput]}
        value={profile.email}
        editable={editMode}
        onChangeText={(text) => setProfile({ ...profile, email: text })}
        keyboardType="email-address"
      />

      <Text style={styles.label}>Address:</Text>
      <TextInput
        style={[styles.input, !editMode && styles.disabledInput]}
        value={profile.address}
        editable={editMode}
        onChangeText={(text) => setProfile({ ...profile, address: text })}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={editMode ? handleSave : () => setEditMode(true)}
      >
        <Text style={styles.buttonText}>{editMode ? 'Save' : 'Edit Profile'}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleLogout}
        style={[styles.button, { backgroundColor: 'grey' }]}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  label: {
    fontSize: 16,
    color: '#444',
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginTop: 5,
    backgroundColor: '#f9f9f9',
  },
  disabledInput: {
    backgroundColor: '#eee',
  },
  button: {
    backgroundColor: 'grey',
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
  },
});


