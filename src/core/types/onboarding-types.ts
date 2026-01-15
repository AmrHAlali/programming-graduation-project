
export type onboardingDataProps = {
    title: string;
    subtitle: string;
    buttonText: string;
    image: string;
} 

export type onboardingScreenProps = {
    length: number,
    setPage: any,
    page: onboardingDataProps,
    activePage: number
}

export type onboardingProps = {
    route: { params?: { activePage?: number } };
    navigation: any;
};