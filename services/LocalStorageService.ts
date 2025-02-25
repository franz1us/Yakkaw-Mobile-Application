import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ranking_type } from "@/constants/Ranking_Data";

// Set Favorite Item
export const setFavorit = async(id:string, favStatus:boolean):Promise<void> => {
  try{
    await AsyncStorage.setItem(`favorite_${id}`, JSON.stringify(favStatus));
    console.log('Favorite ID:',{id},' Status',{favStatus});

    // Checking data is store ! 
    // const savedStatus = await AsyncStorage.getItem(`favorite_${id}`);
    // console.log('Saved Favorite Status:', savedStatus);
  }catch(err){
    console.error(err);
  }
}

// Get Favorite Item
export const getFavorite =  async(id:string):Promise<boolean>=>{
  try{
    const favItem = await AsyncStorage.getItem(`favorite_${id}`);
    return favItem === 'true';
  }catch(err){
    console.error(err);
    return false;
  }
}

// Set Default Location
export const setLocation = async(location: Ranking_type)=>{
  try{
    await AsyncStorage.setItem(`default_location${location}`,JSON.stringify(location));

    // Checking data is store ! 
    // const saveLocation = await AsyncStorage.getItem(`default_location${location}`);
    // console.log(saveLocation)
  }catch(err){
    console.error(err);
  }
}

// Get Default Location
export const getLocation = async (): Promise<Ranking_type | null> => {
  try {
    const location = await AsyncStorage.getItem('default_location');
    return location ? JSON.parse(location) : null;
  } catch (error) {
    console.error("Error getting location:", error);
    return null;
  }
};

// // Get all favorite IDs
// export const getAllFavorites = async (): Promise<string[]> => {
//   try {
//     const keys = await AsyncStorage.getAllKeys();
//     const favoriteKeys = keys.filter(key => key.startsWith('favorite_'));

//     const favorites = await Promise.all(
//       favoriteKeys.map(async (key) => {
//         const status = await AsyncStorage.getItem(key);
//         return status === 'true' ? key.replace('favorite_', '') : null;
//       })
//     );
//     return favorites.filter(Boolean) as string[];
//   } catch (error) {
//     console.error("Error getting favorites:", error);
//     return [];
//   }
// };



// // Save favorite status
// export const saveFavorite = async (id: string, Favstatus: boolean) => {
//   try {
//     await AsyncStorage.setItem(`favorite_${id}`, JSON.stringify(Favstatus));
//     console.log(`Favorite for ${id}: ${Favstatus}`);
//   } catch (error) {
//     console.error("Error saving favorite:", error);
//   }
// };

// Get favorite status
// export const getFavorite = async (id: string): Promise<boolean> => {
//   try {
//     const result = await AsyncStorage.getItem(`favorite_${id}`);
//     return result === 'true';
//   } catch (error) {
//     console.error("Error getting favorite:", error);
//     return false;
//   }
// };

// // Save default location
// export const saveLocation = async (location: Ranking_type) => {
//   try {
//     await AsyncStorage.setItem('default_location', JSON.stringify(location));
//     console.log(`Location saved: ${location.place}`);
//   } catch (error) {
//     console.error("Error saving location:", error);
//   }
// };

// // Get default location
// export const getLocation = async (): Promise<Ranking_type | null> => {
//   try {
//     const location = await AsyncStorage.getItem('default_location');
//     return location ? JSON.parse(location) : null;
//   } catch (error) {
//     console.error("Error getting location:", error);
//     return null;
//   }
// };
