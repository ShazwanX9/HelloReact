const AppDrawerNavigator = () => {
    const [screens, setScreens] = React.useState([]);
  
    React.useEffect(() => {
      const fetchScreens = async () => {
        const applicationsDir = './applications/';
        const contents = await FileSystem.readDirectoryAsync(applicationsDir);
        const screenList = contents.filter(item => {
          return FileSystem.getInfoAsync(`${applicationsDir}/${item}`).then(info => {
            return info.isDirectory;
          });
        });
  
        // Dynamically import components and construct screen objects
        const screens = await Promise.all(
          screenList.map(async screenName => {
            const { default: ScreenComponent } = await import(`${applicationsDir}/${screenName}/${screenName}Screen`);
            return {
              name: screenName,
              component: ScreenComponent
            };
          })
        );
  
        setScreens(screens);
      };
  
      fetchScreens();
    }, []);
  
    return (
      <Drawer.Navigator>
        {screens.map(({ name, component: ScreenComponent }) => (
          <Drawer.Screen
            key={name}
            name={name}
            options={{
              headerTitle: "",
              drawerLabel: <Text>{name}</Text>,
              headerTransparent: true
            }}
            component={ScreenComponent}
          />
        ))}
      </Drawer.Navigator>
    );
  };
  