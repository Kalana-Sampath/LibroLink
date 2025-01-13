import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import LoginPage from "./Screens/Login&Register/LoginPage";
import RegisterPage from "./Screens/Login&Register/RegesterPage";
// import BookDetails from "./Screens/BookDetails";
import SearchBook from "./Screens/Profile";
import HomePage from "./Screens/HomePage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Exchange from "./Screens/Exchange";
import AddBook from "./Screens/AddBook";
import { View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import RecommandedBook from "./Screens/RecommandedBook";
import Profile from "./Screens/Profile";
import EditProfileName from "./Screens/ProfilePages/EditProfileName";
import ChangePassword from "./Screens/ProfilePages/ChangePassword";
import MYList from "./Screens/ProfilePages/MyList";
import TestMyList from "./Screens/TestMyList";


const Tabnav = () => {
    const Tab = createBottomTabNavigator();
    const Stack = createNativeStackNavigator();


    return (
        <Tab.Navigator
        screenOptions={{
            headerTitle: '',
            headerShown: true,
            headerStyle: {
                height: 70, // Adjust the height of the header (default is 56, you can set it to less)
              },
            tabBarActiveTintColor: "#0163d2",
            tabBarInactiveTintColor: "black",
            tabBarLabelStyle: {
                fontSize: 14,
                paddingBottom: 5,
                fontWeight: 600,
            },
            tabBarStyle:{
                height: 60,
                paddingTop: 0,
            }
        }}
        >
        <Stack.Screen name="Home" component={RecommandedBook} 
            options={{
                tabBarIcon: ({ focused }) => (
                    <Icon 
                        name={focused ? 'home' : 'home-outline'} // Change icon based on focus
                        size={28} 
                        color={focused ? '#0163d2' : 'black'}    // Change color based on focus
                    />
                )
            }}  
        /> 
        <Tab.Screen name="Exchange" component={Exchange}
            options={{
                tabBarIcon: ({ focused }) => (
                    <Icon 
                        name={focused ? 'home' : 'home-outline'} // Change icon based on focus
                        size={28} 
                        color={focused ? '#0163d2' : 'black'}    // Change color based on focus
                    />
                )
            }}
        />
          <Tab.Screen name="Profile" component={Profile}
            options={{
                tabBarIcon: ({ focused }) => (
                    <Icon 
                        name={focused ? 'home' : 'home-outline'} // Change icon based on focus
                        size={28} 
                        color={focused ? '#0163d2' : 'black'}    // Change color based on focus
                    />
                )
            }}
          />
        
        </Tab.Navigator>
    )
}

function App() {
    const Stack = createNativeStackNavigator();
    

    return (  
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                {/* <Stack.Screen name="TestMyList" component={TestMyList}/> */}
                <Stack.Screen name="HomePage" component={HomePage}/>
                <Stack.Screen name="Login" component={LoginPage} />
                <Stack.Screen name="Register" component={RegisterPage} />
                
                
                <Stack.Screen name="Home" component={Tabnav}/>
                <Stack.Screen name="EditProfileName" component={EditProfileName} />
                <Stack.Screen name="ChangePassword" component={ChangePassword} />
                <Stack.Screen name="MyList" component={MYList} 
                    options={{
                        headerTitle: '',
                        headerShown: true,
                        headerBackVisible: false, 
                        headerStyle: {
                            height: 70, // Adjust the height of the header (default is 56, you can set it to less)
                          },
                    }}
                />
                {/* <Stack.Screen name="BookDetails" component={BookDetails} /> */}
                                
            </Stack.Navigator>
        </NavigationContainer>
    );
}
export default App;
