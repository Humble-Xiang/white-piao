import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Box, Icon, Row, IconButton, View, Input, Heading } from 'native-base';
import { useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import FavoritesPage from './FavoritesPage';
import SettingsPage from './SettingsPage';
import SourcesPage from './SourcesPage';

const renderIcon = (key: string, focused: boolean) => {
  if (focused) {
    if (key === 'favorite') {
      return <MaterialIcons name="favorite" />;
    } else if (key === 'source') {
      return <Ionicons name="card" />;
    } else {
      return <Ionicons name="settings" />;
    }
  } else {
    if (key === 'favorite') {
      return <MaterialIcons name="favorite-outline" />;
    } else if (key === 'source') {
      return <Ionicons name="card-outline" />;
    } else {
      return <Ionicons name="settings-outline" />;
    }
  }
};

const renderTabBar = (props: any) => (
  <Box className="bg-cyan-600">
    <TabBar
      {...props}
      renderIcon={({ route, focused }) => (
        <Icon as={renderIcon(route.key, focused)} className={`${focused ? 'text-pink-800' : 'text-white'} mb-1`} />
      )}
      style={{ backgroundColor: '' }}
      indicatorStyle={{ backgroundColor: '' }}
    />
  </Box>
);

const renderScene = SceneMap({
  favorite: FavoritesPage,
  source: SourcesPage,
  settings: SettingsPage,
});

export default function HomePage() {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'favorite', title: '收藏' },
    { key: 'source', title: '来源' },
    { key: 'settings', title: '设置' },
  ]);

  return (
    <>
      <AppBar />
      <TabView
        tabBarPosition="bottom"
        renderTabBar={renderTabBar}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
    </>
  );
}

const AppBar = () => {
  const navigation = useNavigation<any>();

  const [keyword, setKeyword] = useState<string>('');

  return (
    <Box safeAreaTop className="bg-cyan-600">
      <Row className="pl-5 py-3 justify-between">
        <Row className="items-center">
          <Heading size="sm" className="text-white">
            WhitePiao
          </Heading>
        </Row>
        <Row className="flex-1 pl-5 pr-1 justify-evenly items-center">
          <View className="flex-1">
            <Input
              value={keyword}
              onChangeText={setKeyword}
              onSubmitEditing={() => {
                if (keyword) navigation.navigate('SearchPage', { keyword });
              }}
              placeholder="搜索影视"
              variant="rounded"
              size="xs"
              borderWidth={0}
              className="h-8 bg-cyan-700 text-white"
            />
          </View>
          <IconButton
            icon={<Icon as={MaterialIcons} name="search" size="sm" color="white" />}
            onPress={() => {
              if (keyword) navigation.navigate('SearchPage', { keyword });
            }}
          />
        </Row>
      </Row>
    </Box>
  );
};
