import { FC } from "react";
import Image from "next/image";
import { colorsEnum } from "../../styles/colors";

export enum IconEnum {
  LOGOUT = "/icons/logOut.svg",
  USER = "/icons/user.svg",
  ARTIST = "/icons/artist.svg",
  BLUEUSER = "/icons/blueUser.svg",
  BLUEARTIST = "/icons/blueArtis.svg",
  SEARCH = "/icons/search.svg",
  BIN = "/icons/bin.svg"
}

interface Props {
  Icon: keyof typeof IconEnum;
  size: string | number;
  color?: keyof typeof colorsEnum;
}

const Icon: FC<Props> = ({ Icon, size, color, }) => {
  return (<Image src={`/icons/${IconEnum[Icon]}`} width={32} height={32} alt="" />)
};

export default Icon;
