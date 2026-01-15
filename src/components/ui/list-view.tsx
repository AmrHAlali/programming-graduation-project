// import React, { forwardRef, PropsWithoutRef } from "react";
// import {
//   ActivityIndicator,
//   FlatList,
//   ImageSourcePropType,
//   View,
// } from "react-native";
// // import { FlashList, FlashListProps } from "@shopify/flash-list";
// import { isRTL } from "@/core/i18n";
// import { Text } from "./text";
// import { LocalImage } from "./image";
// import { hp, imgRegistry, wp } from "@/core";

// // export type ListViewRef<T> = FlashList<T> | FlatList<T>;

// // export type ListViewProps<T> = PropsWithoutRef<FlashListProps<T>>;

// type Props = {
//   isLoading: boolean;
//   text?: string;
//   image?: ImageSourcePropType;
//   width?: number;
//   height?: number;
// };

// /**
//  * This is a Higher Order Component meant to ease the pain of using @shopify/flash-list
//  * when there is a chance that a user would have their device language set to an
//  * RTL language like Arabic or Persian. This component will use react-native's
//  * FlatList if the user's language is RTL or FlashList if the user's language is LTR.
//  *
//  * Because FlashList's props are a superset of FlatList's, you must pass estimatedItemSize
//  * to this component if you want to use it.
//  *
//  * This is a temporary workaround until the FlashList component supports RTL at
//  * which point this component can be removed and we will default to using FlashList everywhere.
//  * @see {@link https://github.com/Shopify/flash-list/issues/544|RTL Bug Android}
//  * @see {@link https://github.com/Shopify/flash-list/issues/840|Flashlist Not Support RTL}
//  * @param {FlashListProps | FlatListProps} props - The props for the `ListView` component.
//  * @param {React.RefObject<ListViewRef>} forwardRef - An optional forwarded ref.
//  * @returns {JSX.Element} The rendered `ListView` component.
//  */
// const ListViewComponent = forwardRef(
//   <T,>(props: ListViewProps<T>, ref: React.ForwardedRef<ListViewRef<T>>) => {
//     const ListComponentWrapper = isRTL ? FlatList : FlashList;

//     return <ListComponentWrapper {...props} ref={ref} />;
//   }
// );

// ListViewComponent.displayName = "ListView";

// export const ListView = ListViewComponent as <T>(
//   props: ListViewProps<T> & {
//     ref?: React.RefObject<ListViewRef<T>>;
//   }
// ) => React.ReactElement;

// export const EmptyList = React.memo(
//   ({
//     isLoading,
//     text = "Sorry! No data found",
//     image,
//     height,
//     width,
//   }: Props) => {
//     return (
//       <View
//         style={[{ flex: 1, justifyContent: "center", alignItems: "center" }]}
//       >
//         {!isLoading ? (
//           <View style={{ alignItems: "center" }}>
//             {/* <NoData image={image} width={width} height={height} /> */}
//             <Text
//               style={{
//                 textAlign: "center",
//                 marginVertical: hp(1),
//                 width: wp(80),
//               }}
//             >
//               {text}
//             </Text>
//           </View>
//         ) : (
//           <ActivityIndicator />
//         )}
//       </View>
//     );
//   }
// );

// export const NoData = ({
//   image = imgRegistry.noData,
//   width = 20,
//   height = 12,
// }: {
//   image?: ImageSourcePropType;
//   width?: number;
//   height?: number;
// }) => (
//   <LocalImage
//     source={image}
//     style={{ width: wp(width), height: hp(height), resizeMode: "contain" }}
//   />
// );
