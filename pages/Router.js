import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Chat from "./Chat";
import Contact from "./Contact";
import Discovery from "./Discovery";
import Profile from "./Profile";
import EditFriend from "./EditFriend";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import ViewButton from "../components/ViewButton";
import AddFriend from "./AddFriend";
import ChatPage from "./ChatPage";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const addHandler = ({ naviation }) => {
  console.log("add");
};

const HomeTabs = ({ navigation }) => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#008c8c",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 20,
        },
      }}
    >
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="chatbox-ellipses-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Contact"
        component={Contact}
        options={{
          headerRight: () => (
            <ViewButton onPress={() => navigation.navigate("AddFriend")}>
              <Ionicons
                name="person-add-outline"
                size={24}
                color="white"
                style={{ marginRight: 15 }}
              />
            </ViewButton>
          ),

          tabBarIcon: ({ color, size }) => (
            <AntDesign name="contacts" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Discovery"
        component={Discovery}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="find" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="user" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

function Router() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#008c8c",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 20,
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="AddFriend" component={AddFriend} />
        <Stack.Screen name="Edit" component={EditFriend} />
        <Stack.Screen name="ChatPage" component={ChatPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Router;
