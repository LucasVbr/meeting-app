import { Flex, Tag } from "@chakra-ui/react";

export default function ProfileBadgeList(props) {
  const { passions, userPassions } = props;
  return (
    <Flex gap={"0.5rem"} mt={"1vh"} flexWrap="wrap">
      {userPassions.map((idPassion, index) => (
        <Tag key={index} colorScheme={"purple"}>
          {passions !== null && passions !== undefined
            ? passions.find((element) => element.id === idPassion).name
            : ""}
        </Tag>
      ))}
    </Flex>
  );
}
