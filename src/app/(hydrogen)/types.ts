export interface IData {
  videSection: {
    videURL: string;
    title: string;
    subTitle: string;
    textButton: string;
    nextRoute: string;
  };
  featureCards: Array<{
    image: string;
    title: string;
    subTitle: string;
  }>;
  advantagesTitle: string;
  advantagesContainerClassName?: string;
  advantagesData: Array<{
    icon: React.ReactNode;
    text: string;
    className?: string;
  }>;
}
