import React from "react"
import { View, Button, Image, TouchableOpacity } from "react-native"
import { Text } from "./components/dynamic-text"
import { useNavigation } from "@react-navigation/native"
import { mapOnPress } from "./Helpers/onPressMap"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { AppStackParamList } from "@/navigators/navigationTypes"

type NavProp = NativeStackNavigationProp<AppStackParamList>

export function Renderer({ structure, onNavigate }: any) {
  if (!structure) return null

  const renderComponent = (component: any) => {
    const navigation = useNavigation<NavProp>()
    const handlePress = mapOnPress(component, navigation)

    switch (component.type) {
      case "Text":
        return (
          <Text onPress={handlePress} key={component.id} component={component} />
        )

      case "Button":
        return (
          <View key={component.id} style={{ marginVertical: 8 }}>
            <Button
              title={component.title || "Button"}
              onPress={() => {
                if (component.navigateTo) {
                  console.log("Navigating to:", component.navigateTo)
                  onNavigate?.(component.navigateTo)
                } else {
                  console.log("Button pressed:", component.id)
                }
                handlePress?.()
              }}
            />
          </View>
        )

      case "Image":
        return (
          <Image
            key={component.id}
            source={{ uri: component.source }}
            style={{
              width: component.style?.width || 100,
              height: component.style?.height || 100,
              marginVertical: component.style?.marginVertical || 8,
              resizeMode: component.style?.resizeMode || "contain",
            }}
          />
        )

      case "Touchable":
        return (
          <TouchableOpacity
            key={component.id}
            onPress={handlePress}
            style={{
              padding: 10,
              backgroundColor: component.style?.backgroundColor || "#ddd",
              borderRadius: 8,
              marginVertical: 8,
            }}
          >
            <Text component={component}>{component.label || "Touchable"}</Text>
          </TouchableOpacity>
        )

      default:
        console.warn("Unknown component type:", component.type)
        return null
    }
  }

  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        backgroundColor: structure.style?.backgroundColor || "#fff",
      }}
    >
      {structure.components?.map((component: any) => renderComponent(component))}
    </View>
  )
}
