import React, { useContext } from 'react';
import styled from '@emotion/styled';
import _ from 'lodash';
import theme from '../../config/theme';
import { Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css";

const Wrapper = styled.article`
  position: relative;
  z-index: 0;
  border-radius: ${props => props.theme.borderRadius.default};
  {/* box-shadow: ${props => props.theme.shadow.feature.small.default};*/}
  transition: ${props => props.theme.transitions.boom.transition};
  height: 10rem;

  &:hover {
    box-shadow: ${props => props.theme.shadow.feature.small.hover};
    transform: scale(1.04);
    > div {
      display: block;
    }
    }
  }

  @media (max-width: 1000px) {
    height: 10rem;
  }

  @media (max-width: 600px) {
    flex-basis: 100%;
    max-width: 100%;
    width: 100%;
    height: 10rem;
  }
`;

const Image = styled.div`
  position: absolute;
  top: 0;
  overflow: hidden;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 1;
  object-fit: cover;
  text-align: center;
  border-radius: ${props => props.theme.borderRadius.default};
  img {
    border-radius: ${props => props.theme.borderRadius.default};

  }
  > div {
    position: static !important;
  }
  > div > div {
    position: static !important;
  }
`;

const StyledLink = styled.a`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 1rem;
  z-index: 3;
  border-radius: ${props => props.theme.borderRadius.default};
  &:after {
    content: '';
    text-align: center;
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 30%,
      rgba(0, 0, 0, 0.2) 60%,
      rgba(0, 0, 0, 0.5) 80%,
      rgba(0, 0, 0, 0.7) 100%
    );
    z-index: -10;
    border-radius: ${theme.borderRadius.default};
    transition: opacity ${theme.transitions.default.duration};
  }
`;

const Information = styled.div`
  color: ${props => props.theme.colors.white.light};
  margin: 0.5rem;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 90%;
  overflow: hidden;
  white-space: nowrap;
`;

const Title = styled.div`

  text-transform: capitalize;
  font-size: .8rem;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  color: #ccc;
  span {
    font-size: 0.8rem
  }

`;

const ShopName = styled.div`
  margin: 0;
  margin-bottom: 0.2rem;
  text-transform: capitalize;
  font-size: .6rem;
  color: #ccc;
  span {
    font-size: 0.8rem
  }

`;

const Price = styled.div`
  font-size: 0.6rem;
  margin: 0 0 0.25rem 0 !important;
  color: #ccc;
  float: right;
`;

const StyledDialog = styled(Dialog)`
@media (max-width: 600px) {
  width: 90vw;
  padding: 1.5rem;
  margin: 11vh auto 5vh auto;
}
.dialogTitle {
  @media (max-width: 600px) {
    font-size: 1.5rem;
  }
}

.shopname {
    display: none;
}

.dialogDescription {
height: 25rem;
overflow: auto;
border-bottom: 1px dotted #ccc;
margin-top: 0.5rem;
}

[data-reach-dialog-content] {
  @media (max-width: 600px) {

  }
}
.dialogImage{
  text-align:center;
  min-width: 40%;
}

.dialogImageDescription {
  display : flex;
  img {
    max-height : 14rem;
    max-width: 80%;
    margin-right: 3%;
  }
  span {
    padding-left: 0rem;
  }

  @media (max-width: 600px) {
    display : block;
    img {
      max-height : 12rem;
      margin: auto;

    }
    span {
      padding-left: 0rem;
    }
  }
}
`;

const EmailsItem = (props) => {
  const [showDialog, setShowDialog] = React.useState(false);
  const openDialog = () => setShowDialog(true);
  const closeDialog = () => setShowDialog(false);

  // console.log("**** props=EmailsItem=", props)
  return (
    <Wrapper>
      {props && props.email &&
        <>
          <Image>
            <a href={`/shops/${props.emprezzoID}/`} title={props.email.node.subject} target="_blank">
              {props.email.node.screenshot && props.email.node.screenshot != "-" &&
                <img src={props.email.node.screenshot} />
              }
            </a>
          </Image>

          <StyledLink href="javascript:void(0)" onClick={() => openDialog()} title={props.email.node.subject}>
            <Information>
              <ShopName>{(props.email.node.name || "").substring(0, 22)}
                {` `}{props.email.node.time}</ShopName>
              <Title>{props.email.node.subject && props.email.node.subject.toLowerCase().substring(0, 24)}</Title>
            </Information>
          </StyledLink>



          <StyledDialog isOpen={showDialog} onDismiss={closeDialog}>
            <button className="close-button" onClick={closeDialog} style={{ float: "right", cursor: "pointer" }}>
              <span aria-hidden>X</span>
            </button>
            <div>
              {props.email.node.screenshot && props.email.node.screenshot != "-" &&
                <img src={props.email.node.screenshot} />
              }
              <h2 style={{ 'font-size': '1.5rem', 'margin-bottom': '9px' }}>{props.email.node.name}</h2>
              <h3 style={{ 'font-size': '1.1rem', 'margin-bottom': '9px' }}>{props.email.node.subject}</h3>
              <span style={{ 'margin-bottom': '12px', 'font-style': 'italic' }}> {props.email.node.time}</span>
              {props.email.node.body_html && props.email.node.body_html != "None" &&
                <div className="dialogDescription" dangerouslySetInnerHTML={{ __html: props.email.node.body_html }} />
              }
              {props.email.node.body_html && props.email.node.body_html == "None" &&
                <div className="dialogDescription" dangerouslySetInnerHTML={{ __html: props.email.node.body_text }} />
              }              
            </div>
          </StyledDialog>
        </>
      }
    </Wrapper>
  );
}

export default EmailsItem;
