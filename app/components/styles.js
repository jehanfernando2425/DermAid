import styled from "styled-components";
import Constants from "expo-constants";

//colors
export const Colors = {
  primary: "#ffffff",
  secondary: "#e5e7eb",
  tertiary: "#1f2937",
  darklight: "#9ca3af",
  brand: "#6d28d9",
  green: "#10b981",
  red: "#ef4444",
  gray: "#6b7280",
  accent: "#ca8a04",
  tint: "#111827",
  lightGreen: `rgba(16, 185, 129, 0.1)`,
  highlight: "#eab308" + "33",
};

// Define styled components
export const StyledContainer = styled.View`
  height: 100%;
  flex: 1;
  padding: 25px;
  padding-top: Constants.statusBarHeight;
  background-color: ${Colors.primary};
  align-items: center;
  justify-content: center;
`;
// otp screen
export const TopHalf = styled.View`
  flex: 1;
  justify-content: center;
  padding: 20px;
`;

export const BottomHalf = styled(TopHalf)`
  justify-content: space-around;
`;

export const InfoText = styled.Text`
  color: ${Colors.gray};
  font-size: 15px;
  text-align: center;
`;

export const EmphasizeText = styled.Text`
  font-weight: bold;
  font-style: italic;
`;

export const InlineGroup = styled.View`
  flex-direction: row;
  padding: 10px;
  justify-content: center;
  align-items: center;
`;

export const IconBG = styled.View`
  width: 250px;
  height: 250px;
  background-color: ${Colors.lightGreen};
  border-radius: 250px;
  justify-content: center;
  align-items: center;
`;

export const InnerContainer = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
`;

export const WelcomeContainer = styled(InnerContainer)`
  padding: 25px;
  padding-top: 10px;
  justify-content: center;
`;

export const Avatar = styled.Image`
  width: 100px;
  height: 100px;
  margin: auto;
  border-radius: 50px;
  border-width: 2px;
  border-color: ${Colors.secondary};
  margin-bottom: 10px;
  margin-top: 10px};
`;

export const WelcomeImage = styled.Image`
  height: 50%;
  min-width: 100%;
`;

export const PageLogo = styled.Image`
  width: 250px;
  height: 250px;
`;

export const PageTitle = styled.Text`
  font-size: 30px;
  text-align: center;
  font-weight: bold;
  color: ${Colors.brand};
  padding: 10px;
`;

export const SubTitle = styled.Text`
  font-size: 18px;
  margin-bottom: 5px;
  letter-spacing: 1px;
  font-weight: bold;
  color: ${Colors.tertiary};
`;

export const StyledFormArea = styled.View`
  width: 90%;
`;

export const StyledTextInput = styled.TextInput`
  background-color: ${Colors.secondary};
  padding: 15px;
  padding-left: 55px;
  padding-right: 55px;
  border-radius: 5px;
  font-size: 16px;
  height: 60px;
  margin-vertical: 3px;
  margin-bottom: 10px;
  color: ${Colors.tertiary};
`;

export const StyledInputLabel = styled.Text`
  color: ${Colors.tertiary};
  font-size: 13px;
  text-align: left;
`;

export const LeftIcon = styled.View`
  left: 15px;
  top: 38px;
  position: absolute;
  z-index: 1;
`;

export const RightIcon = styled.TouchableOpacity`
  right: 15px;
  top: 38px;
  position: absolute;
  z-index: 1;
`;

export const StyledButton = styled.TouchableOpacity`
  padding: 15px;
  background-color: ${Colors.brand};
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  margin-vertical: 5px;
  height: 60px;
`;

export const ButtonText = styled.Text`
  color: ${Colors.primary};
  font-size: 16px;
`;

export const MsgBox = styled.Text`
  text-align: center;
  font-size: 13px;
  color: ${(props) => (props.type == "SUCCESS" ? "green" : "red")};
`;

export const Line = styled.View`
  height: 1px;
  width: 100%;
  background-color: ${Colors.darklight};
  margin-vertical: 10px;
`;

export const ExtraView = styled.View`
  justify-content: center;
  flex-direction: row;
  align-items: center;
  padding: 10px;
`;

export const ExtraText = styled.Text`
  justify-content: center;
  align-items: center;
  color: ${Colors.tertiary};
  font-size: 15px;
`;

export const TextLink = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;

export const TextLinkContent = styled.Text`
  color: ${Colors.brand};
  font-size: 15px;

  ${(props) => {
    const { resendStatus } = props;
    if (resendStatus === "Failed!") {
      return `color: ${Colors.red}`;
    } else if (resendStatus === "Sent!") {
      return `color: ${Colors.green}`;
    }
  }}
`;

// pin input styles
export const CodeInputSection = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-vertical: 30px;
`;

export const HiddenTextInput = styled.TextInput`
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
`;

export const CodeInputContainer = styled.Pressable`
  width: 70%;
  flex-direction: row;
  justify-content: space-between;
`;

export const CodeInput = styled.View`
  border-color: ${Colors.lightGreen};
  min-width: 15%;
  border-width: 2px;
  border-radius: 5px;
  padding: 12px;
`;

export const CodeInputText = styled.Text`
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  color: ${Colors.brand};
`;

export const CodeInputFocused = styled(CodeInput)`
  border-color: ${Colors.green};
`;

// modal styles
export const ModalContainer = styled.View`
  flex: 1;
  padding: 25px;
  padding-top: ${Constants.statusBarHeight + 30}px;
  background-color: ${Colors.primary};
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
`;

export const ModalView = styled.View`
  margin: 20px;
  background-color: white;
  border-radius: 20px;
  padding: 35px;
  align-items: center;
  elevation: 5;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 4px;
  width: 100%;
`;
