import AsyncStorage from '@react-native-async-storage/async-storage';

const checkFirstLaunch = async (navigation) => {
    const firstLaunch = await AsyncStorage.getItem('@FirstLaunch');
    if (firstLaunch) {
        return;
    }
    await AsyncStorage.setItem('@FirstLaunch', 'true');
    navigation.navigate('Onboarding');
}

export default checkFirstLaunch