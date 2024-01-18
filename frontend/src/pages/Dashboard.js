import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDashboardBlogs } from "../redux/get-dashboard-blogs/action";
import {
  Card,
  CardBody,
  Grid,
  GridItem,
  Skeleton,
  Heading,
  Text,
  Stack,
  Flex,
  Box,
} from "@chakra-ui/react";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { dashboardBlogs, isLoading } = useSelector(
    (store) => store.dashboardBlogs
  );

  useEffect(() => {
    dispatch(getDashboardBlogs);
  }, []);
  return (
    <>
      {!isLoading ? (
        <Grid
          templateColumns={[
            "repeat(1, 1fr)",
            "repeat(2, 1fr)",
            "repeat(3, 1fr)",
          ]}
          w={"90%"}
          m="auto">
          {dashboardBlogs.length > 0 ? (
            dashboardBlogs.map((item, index) => {
              return (
                <GridItem
                  py={4}
                  key={index}
                  w={"450px"}
                  minH={"300px"}
                  maxH={"300px"}
                  overflow={"auto"}
                  mb={10}>
                  <Card
                    maxW="sm"
                    boxShadow="lg"
                    borderRadius="md"
                    minHeight="150px"
                    overflow="hidden"
                    color={"#000"}
                    className="hover-card"
                    bgGradient="linear(to-r, red.200, #fff)">
                    <CardBody>
                      <Flex
                        justifyContent={"space-between"}
                        borderBottom="1px solid"
                        alignItems={"center"}
                        pb={2}
                        mb={4}>
                        <Heading size="sm" fontWeight="bold" color="#000">
                          {item.title}
                        </Heading>
                        <Heading as="h6" size="xs" color="red.400">
                          {item.author}
                        </Heading>
                      </Flex>
                      <Text color="#000" fontSize="sm">
                        {item.content}
                      </Text>
                    </CardBody>
                    <style jsx>{`
                      .hover-card {
                        transition: transform 0.3s ease-in-out;
                      }

                      .hover-card:hover {
                        transform: translateY(-10px);
                      }
                    `}</style>
                  </Card>
                </GridItem>
              );
            })
          ) : (
            <Box>
              <Flex
                minH={"100vh"}
                width={"85vw"}
                justifyContent={"center"}
                alignItems={"center"}>
                <Heading>No blog Found</Heading>
              </Flex>
            </Box>
          )}
        </Grid>
      ) : (
        <Stack>
          {new Array(20).fill(0).map((item, index) => (
            <>
              <Skeleton key={index}>
                <div>contents wrapped</div>
                <div>won't be visible</div>
              </Skeleton>
            </>
          ))}
        </Stack>
      )}

      <style jsx>{`
        /* Hide scrollbar for Chrome, Safari, and Edge */
        ::-webkit-scrollbar {
          width: 0;
          background: transparent; /* make scrollbar transparent */
        }

        /* Optional: Hide scrollbar for Firefox */
        /* Firefox 64 and earlier */
        html {
          scrollbar-width: none;
        }

        /* Firefox 65+ */
        html {
          scrollbar-color: transparent transparent;
        }
      `}</style>
    </>
  );
};

export default Dashboard;
