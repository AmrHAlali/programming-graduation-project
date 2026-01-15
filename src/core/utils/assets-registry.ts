// Use assets as variables to easily modifying it

const baseUrl = "../../../assets";
const imagesBaseUrl = `${baseUrl}/images`;
const fontsBaseUrl = `${baseUrl}/fonts`;
const lottiesBaseUrl = `${baseUrl}/lotties`;

export const imgRegistry = {
  profileDummy: require(`${imagesBaseUrl}/profile-dummy.png`),
  discover: require(`${imagesBaseUrl}/discover.jpg`),
  connected: require(`${imagesBaseUrl}/connected.jpg`),
  customization: require(`${imagesBaseUrl}/customization.jpg`),
};

export const lottieRegistry = {
  noDataFound: require(`${lottiesBaseUrl}/no-data-found.json`),
};

export const videoRegistry = {

};

export const fontRegistry = {
  TajawalBold: require(`${fontsBaseUrl}/Tajawal-Bold.ttf`),
  TajawalLight: require(`${fontsBaseUrl}/Tajawal-Light.ttf`),
  TajawalMedium: require(`${fontsBaseUrl}/Tajawal-Medium.ttf`),
}

