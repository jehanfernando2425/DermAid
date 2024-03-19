import React, { useState, useEffect, useContext } from "react";
import KeyBoardAvoidingWrapper from "../components/KeyBoardAvoidingWrapper";
import CodeInputField from "../components/CodeInputField";
import { ScrollView, StyleSheet } from "react-native";
import {
  StyledContainer,
  TopHalf,
  IconBG,
  BottomHalf,
  Colors,
  PageTitle,
  InfoText,
  EmphasizeText,
  StyledButton,
  ButtonText,
} from "../components/styles";
import { StatusBar } from "expo-status-bar";
import ResendTimer from "../components/ResendTimer";

import VerificationModal from "../components/VerificationModal";

import axios from "axios";

import { baseAPIURL } from "../components/shared";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { CredentialsContext } from "../components/CredentialsContext";

import { Octicons, Ionicons } from "@expo/vector-icons";
import { ActivityIndicator } from "react-native";

const OTPVerificationScreen = ({ route }) => {
  const [code, setCode] = useState("");
  const [pinReady, setPinReady] = useState(false);

  // verification button
  const [verifying, setVerifying] = useState(false);

  const MAX_CODE_LENGTH = 4;

  // modal
  const [modalVisible, setModalVisible] = useState(false);
  const [verificationSuccessful, setVerificationSuccessful] = useState(false);
  const [requestMessage, setRequestMessage] = useState("");

  // resend timer
  const [timeLeft, setTimeLeft] = useState(null);
  const [targetTime, setTargetTime] = useState(null);
  const [activeResend, setActiveResend] = useState(false);

  const [resendingEmail, setResendingEmail] = useState(false);
  const [resendStatus, setResendStatus] = useState("Resend");

  let resendTimerInterval;

  const { email, userID } = route?.params;

  const triggerTimer = (targetTimeInSeconds = 30) => {
    setTargetTime(targetTimeInSeconds);
    setActiveResend(false);
    const finalTime = +new Date() + targetTimeInSeconds * 1000;
    resendTimerInterval = setInterval(() => calculateTimeLeft(finalTime), 1000);
  };

  const calculateTimeLeft = (finalTime) => {
    const difference = finalTime - +new Date();
    if (difference >= 0) {
      setTimeLeft(Math.round(difference / 1000));
    } else {
      clearInterval(resendTimerInterval);
      setActiveResend(true);
      setTimeLeft(null);
    }
  };

  useEffect(() => {
    triggerTimer();

    return () => {
      clearInterval(resendTimerInterval);
    };
  }, []);

  const resendEmail = async () => {
    setResendingEmail(true);
    const url = `${baseAPIURL}/user/resendOTP`;

    try {
      await axios.post(url, { email, userID });
      setResendStatus("Sent!");
    } catch (error) {
      setResendStatus("Failed!");
      alert("Resending email verification failed!");
    }
    setResendingEmail(false);
    setTimeout(() => {
      setResendStatus("Resend");
      setActiveResend(false);
      triggerTimer();
    }, 5000);
  };

  const submitOTPVerification = async () => {
    try {
      setVerifying(true);
      const url = `${baseAPIURL}/user/verifyOTP/`;
      const result = await axios.post(url, { userID, otp: code });
      const { data } = result;

      if (data.status !== "VERIFIED") {
        setVerificationSuccessful(false);
        setRequestMessage(data.message);
      } else {
        setVerificationSuccessful(true);
      }

      setModalVisible(true);
      setVerifying(false);
    } catch (error) {
      setRequestMessage(error.message);
      setVerificationSuccessful(false);
      setModalVisible(true);
      setVerifying(false);
    }
  };

  const { storedCredentials, setStoredCredentials } =
    useContext(CredentialsContext);

  const persistLoginAfterOTPVerification = async () => {
    try {
      const tempUser = await AsyncStorage.getItem("tempUser");
      await AsyncStorage.setItem(
        "dermAidCredentials",
        JSON.stringify(tempUser)
      );
      setStoredCredentials(JSON.parse(tempUser));
    } catch (error) {
      alert(`Error with persisting the user data.`);
    }
  };

  return (
    <ScrollView>
      <KeyBoardAvoidingWrapper>
        <StyledContainer>
          <TopHalf>
            <IconBG>
              <StatusBar style="dark" />
              <Octicons name="lock" size={125} color={Colors.brand} />
            </IconBG>
          </TopHalf>
          <BottomHalf>
            <PageTitle style={{ fontSize: 25 }}>Account Verification</PageTitle>
            <InfoText>
              Please enter the 4 digit code sent to
              <EmphasizeText>{email}</EmphasizeText>
            </InfoText>
            <CodeInputField
              setPinReady={setPinReady}
              code={code}
              setCode={setCode}
              maxLength={MAX_CODE_LENGTH}
            />

            {!verifying && pinReady && (
              <StyledButton
                style={{ backgroundColor: Colors.green, flexDirection: "row" }}
                onPress={submitOTPVerification}
              >
                <ButtonText>Verify</ButtonText>
                <Ionicons
                  name="checkmark-circle"
                  size={25}
                  color={Colors.primary}
                />
              </StyledButton>
            )}

            {!verifying && !pinReady && (
              <StyledButton
                disable={true}
                style={{
                  backgroundColor: Colors.lightGreen,
                  flexDirection: "row",
                }}
              >
                <ButtonText style={{ color: Colors.gray }}>Verify</ButtonText>
                <Ionicons
                  name="checkmark-circle"
                  size={25}
                  color={Colors.gray}
                />
              </StyledButton>
            )}

            {verifying && (
              <StyledButton
                disabled={true}
                style={{ backgroundColor: Colors.green, flexDirection: "row" }}
                onPress={submitOTPVerification}
              >
                <ActivityIndicator size="large" color={Colors.primary} />
              </StyledButton>
            )}
            <ResendTimer
              activeResend={activeResend}
              resendingEmail={resendingEmail}
              resendStatus={resendStatus}
              timeLeft={timeLeft}
              targetTime={targetTime}
              resendEmail={resendEmail}
            />
          </BottomHalf>
          <VerificationModal
            successful={verificationSuccessful}
            setModalVisible={setModalVisible}
            modalVisible={modalVisible}
            requestMessage={requestMessage}
            persistLoginAfterOTPVerification={persistLoginAfterOTPVerification}
          />
        </StyledContainer>
      </KeyBoardAvoidingWrapper>
    </ScrollView>
  );
};

export default OTPVerificationScreen;