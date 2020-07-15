import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 30px;
`;

export const Header = styled.View`
  position: relative;
  width: 100%;
  align-items: center;

  margin-top: 24px;
`;

export const BackButton = styled.TouchableOpacity`
  position: absolute;
  left: 0;
`;

export const AvatarButton = styled.TouchableOpacity`
  width: 186px;
`;

export const UserAvatar = styled.Image`
  width: 186px;
  height: 186px;
  border-radius: 93px;

  align-self: center;
`;

export const CameraIcon = styled.View`
  background-color: #FF9000;
  width: 50px;
  height: 50px;
  border-radius: 25px;

  align-items: center;
  justify-content: center;

  position: absolute;
  bottom: 3px;
  right: 3px;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #fff;
  font-family: 'RobotoSlab-Medium';

  align-self: flex-start;

  margin: 24px 0;
`;
