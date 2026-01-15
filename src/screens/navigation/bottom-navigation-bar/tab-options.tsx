import { useEffect, useRef } from "react";
import { Animated, View } from "react-native";
import { colors, TxKeyPath, wp } from "@/core";
import { colorWithOpacity } from "@/core/utils/color-with-opacity";
import { useTranslation } from "react-i18next";

type IconProps = { width?: number; height?: number; color?: string };
type IconFC = React.FC<IconProps>;

const AnimatedTabIcon = ({ 
  Icon, 
  focused 
}: { 
  Icon: IconFC; 
  focused: boolean;
}) => {
  const scaleAnim = useRef(new Animated.Value(focused ? 1 : 0.85)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: focused ? 1 : 0.85,
        useNativeDriver: true,
        tension: 80,
        friction: 8,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, [focused, scaleAnim, opacityAnim]);

  return (
    <Animated.View
      style={{
        transform: [{ scale: scaleAnim }],
        opacity: opacityAnim,
      }}
    >
      <View
        style={{
          backgroundColor: focused
            ? colorWithOpacity(colors.primary, 0.16)
            : colors.neutrals.transparent,
          borderRadius: 100,
          paddingHorizontal: Math.max(wp(4), Math.min(wp(5), 20)),
          paddingVertical: Math.max(wp(1.5), Math.min(wp(2), 8)),
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Icon
          width={Math.max(20, Math.min(wp(6), 28))}
          height={Math.max(20, Math.min(wp(6), 28))}
          color={focused ? colors.primary : colors.neutrals.gray700}
        />
      </View>
    </Animated.View>
  );
};

export const useTabOptions = (labelKey: string, Icon: IconFC) => {
  
  return {
    tabBarLabel: labelKey,
    tabBarIcon: ({ focused }: { focused: boolean }) => (
      <AnimatedTabIcon Icon={Icon} focused={focused} />
    ),
  };
};
