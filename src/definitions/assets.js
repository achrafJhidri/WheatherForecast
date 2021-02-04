import React from "react";
import { Icon } from "@ui-kitten/components";

const sunIcon = (props) => <Icon {...props} name="sun" />;
const HomeIcon = (props) => <Icon {...props} name="home" />;
const pinOutline = (props) => <Icon {...props} name="pin" />;
const locationIcon = (props) => <Icon {...props} name="compass" />;
const favoriteIcon = (props) => <Icon {...props} name="heart" />;

const searchIcon = (props) => <Icon {...props} name="search" />;
const backIcon = (props) => <Icon {...props} name="arrow-back" />;
const addIcon = (props) => <Icon {...props} name="plus" />;
const alertIcon = (props) => <Icon {...props} name="alert-triangle" />;

export const assets = {
  icons: {
    // HomeIcon,
    // locationIcon,
    // sunIcon,
    pinOutline,
    favoriteIcon,
    searchIcon,
    backIcon,
    alertIcon,
    addIcon,
  },
};
