import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

type IoniconsName = React.ComponentProps<typeof Ionicons>['name'];

interface TabConfig {
  name: string;
  title: string;
  icon: IoniconsName;
  activeIcon: IoniconsName;
  color: string;
}

const TABS: TabConfig[] = [
  { name: 'index',       title: 'Básicos',   icon: 'layers-outline',   activeIcon: 'layers',        color: '#6366F1' },
  { name: 'inputs',      title: 'Inputs',    icon: 'create-outline',   activeIcon: 'create',        color: '#10B981' },
  { name: 'lists',       title: 'Listas',    icon: 'list-outline',     activeIcon: 'list',          color: '#F59E0B' },
  { name: 'feedback',    title: 'Feedback',  icon: 'chatbubble-outline',activeIcon: 'chatbubble',   color: '#EF4444' },
  { name: 'layout',      title: 'Layout',    icon: 'grid-outline',     activeIcon: 'grid',          color: '#8B5CF6' },
];

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => {
        const tab = TABS.find((t) => t.name === route.name);
        return {
          tabBarActiveTintColor: tab?.color ?? '#6366F1',
          tabBarInactiveTintColor: '#64748B',
          tabBarStyle: {
            backgroundColor: '#0F172A',
            borderTopColor: '#1E293B',
            height: 65,
            paddingBottom: 8,
          },
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: '600',
          },
          headerShown: false,
        };
      }}
    >
      {TABS.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ color, focused, size }) => (
              <Ionicons
                name={focused ? tab.activeIcon : tab.icon}
                size={size}
                color={color}
              />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
