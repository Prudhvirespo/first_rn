import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DeviceInfo from 'react-native-device-info';
export default function App() {
  const [lattitute, setLattitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);
  const [serialNumber, setSerialNumber] = useState<string>('');
  const [os, setOs] = useState<string>('');
  const [imei, setIMEI] = useState<string>('');
  useEffect(() => {
    DeviceInfo.getBaseOs().then((baseOs) => {
      setOs(baseOs);
    });
    DeviceInfo.getSerialNumber().then((serialNumber) => {
      setSerialNumber(serialNumber);
    });
    const deviceId = DeviceInfo.getDeviceId();
    setIMEI(deviceId);
    navigator.geolocation.getCurrentPosition(
      (position: any) => {

        setLattitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        setError(null);

      },
      (error: any) => setError(error.message),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 },
    );
  })
  return (
    <View style={styles.container}>
      <Text>Latitude: {lattitute}</Text>
      <Text>Longitude: {longitude}</Text>
      {error ? <Text>Error: {error}</Text> : null}
      <Text>Serial Number: {serialNumber}</Text>
      <Text>OS: {os}</Text>
      <Text>IMEI: {imei}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
