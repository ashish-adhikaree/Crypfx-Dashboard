import React, { useContext, useEffect, useState } from "react";
import PageContainer from "../../src/components/container/Pagecontainer";
import {
  Avatar,
  Box,
  Button,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import crypfxLogo from "../../public/favicon.png";
import { IconSend } from "@tabler/icons-react";
import { AuthContext } from "../../context";
import { useRouter } from "next/router";
import axios from "axios";
import DefaultUserImage from "../../public/images/profile/defaultuser.png";
import Head from "next/head";

const Chat = () => {
  const { userid, type } = useContext(AuthContext);
  const router = useRouter();
  const convid = router.query.convid;
  const name = router.query.name;
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<Array<any>>([]);
  const getMessages = async () => {
    const { data } = await axios.post("/api/getMessages", {
      convid: convid,
    });
    if (data.status === "success") {
      setMessages(data.messages);
    }
  };

  const sendMessage = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    messages.push({
      convid: convid,
      byAdmin: type === "Admin" ? 1 : 0,
      message: newMessage,
      inserton: Date.now()
    });
    setNewMessage("");
    const { data } = await axios.post("/api/sendMessage", {
      convid: convid,
      message: newMessage,
    });
    console.log(data);
  };

  useEffect(() => {
    getMessages();
  }, []);

  if (type === "Admin" || userid === convid) {
    return (
      <PageContainer title="Chat | Crypfx">
        <Head>
          <title>Chat | Crypfx</title>
        </Head>
        <Box
          sx={{
            border: "1px solid #cfcfcf",
            maxHeight: "80vh",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <Box>
            {/* ------------------------------------------- */}
            {/* Header Part */}
            {/* ------------------------------------------- */}
            <Box height={"82px"}>
              <Box display="flex" alignItems="center" p={2}>
                <ListItem dense disableGutters>
                  <ListItemAvatar>
                    {type === "Customer" ? (
                      <Avatar alt="Crypfx" src={crypfxLogo.src} />
                    ) : type === "Admin" ? (
                      <Avatar
                        sx={{
                          height: "30px",
                          width: "30px",
                          backgroundColor: "rgba(58, 58, 58, .15)",
                        }}
                        alt={name ? (name as string) : "user"}
                        src={DefaultUserImage.src}
                      />
                    ) : (
                      <></>
                    )}
                  </ListItemAvatar>
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: "700",
                      textTransform: "capitalize",
                    }}
                  >
                    {type === "Customer" ? " Crypfx Team" : name}
                  </Typography>
                </ListItem>
              </Box>
              <Divider />
            </Box>
            {/* ------------------------------------------- */}
            {/* Chat Content */}
            {/* ------------------------------------------- */}

            <Box
              display="flex"
              sx={{ paddingBottom: "65px", height: "calc(80vh - 85px)" }}
            >
              {/* ------------------------------------------- */}
              {/* Chat msges */}
              {/* ------------------------------------------- */}

              <Box width="100%" height="100%">
                <Box
                  sx={{
                    height: "100%",
                    overflow: "auto",
                    maxHeight: "100%",
                  }}
                >
                  <Box p={3}>
                    {messages && messages.length !== 0 ? (
                      messages.map((chat, index) => {
                        const date = new Date(chat.inserton);

                        return (
                          <Box key={chat.convid + index}>
                            {(type === "Customer" && chat.byAdmin === 1) ||
                            (type === "Admin" && chat.byAdmin === 0) ? (
                              <Box display="flex" alignItems={"center"}>
                                <ListItemAvatar>
                                  {type === "Customer" && chat.byAdmin === 1 ? (
                                    <Avatar
                                      alt={"user"}
                                      src={crypfxLogo.src}
                                      sx={{ width: 40, height: 40 }}
                                    />
                                  ) : (
                                    <Avatar
                                      alt={"user"}
                                      src={DefaultUserImage.src}
                                      sx={{
                                        width: 40,
                                        height: 40,
                                        backgroundColor:
                                          "rgba(58, 58, 58, .15)",
                                      }}
                                    />
                                  )}
                                </ListItemAvatar>
                                <Box>
                                  {chat.inserton ? (
                                    <Typography
                                      variant="body2"
                                      color="grey.400"
                                      mb={1}
                                    >
                                      {new Date(chat.inserton).toDateString()}
                                    </Typography>
                                  ) : null}
                                  <Box
                                    mb={2}
                                    sx={{
                                      p: 1,
                                      backgroundColor: "grey.100",
                                      mr: "auto",
                                      maxWidth: "320px",
                                    }}
                                  >
                                    {chat.message}
                                  </Box>
                                </Box>
                              </Box>
                            ) : (
                              <Box
                                mb={1}
                                display="flex"
                                alignItems="flex-end"
                                flexDirection="row-reverse"
                              >
                                <Box
                                  alignItems="flex-end"
                                  display="flex"
                                  flexDirection={"column"}
                                >
                                  {chat.inserton ? (
                                    <Typography
                                      variant="body2"
                                      color="grey.400"
                                      mb={1}
                                    >
                                      {new Date(chat.inserton).toDateString()}
                                    </Typography>
                                  ) : null}
                                  <Box
                                    mb={1}
                                    sx={{
                                      p: 1,
                                      backgroundColor: "primary.light",
                                      ml: "auto",
                                      maxWidth: "320px",
                                    }}
                                  >
                                    {chat.message}
                                  </Box>
                                </Box>
                              </Box>
                            )}
                          </Box>
                        );
                      })
                    ) : (
                      <Box
                        sx={{ height: "200px" }}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        p={2}
                        pb={1}
                        pt={1}
                      >
                        <Typography>No chat histroy</Typography>
                      </Box>
                    )}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              position: "absolute",
              inset: "0",
              top: "auto",
              background: "white",
              height: "65px",
            }}
          >
            <Divider />

            <form
              style={{
                padding: "0px 20px",
                display: "flex",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <TextareaAutosize
                style={{
                  width: "100%",
                  height: "65px",
                  border: "none",
                  outline: "none",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  padding: "20px",
                  resize: "none",
                }}
                value={newMessage}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                  setNewMessage(e.target.value);
                }}
                maxRows={8}
                placeholder="Type a message"
              />
              <button
                type="submit"
                style={{
                  cursor: "pointer",
                  display: "flex",
                  border: "none",
                  background: "transparent",
                }}
                onClick={sendMessage}
              >
                <IconSend stroke={1.5} size="20" />
              </button>
            </form>
          </Box>
        </Box>
      </PageContainer>
    );
  } else {
    router.push("/");
    return <></>;
  }
};

export default Chat;
