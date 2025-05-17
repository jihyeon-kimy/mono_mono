import { Flex, Image, Text } from "@sadang-new/ui";
import ListRow from "@shared/components/ListRow";
import useHotels from "@components/main/hooks/useHotels";
import HotelSkeleton from "./HotelSkeleton";
import InfiniteScroll from "react-infinite-scroll-component";
import { Fragment } from "react/jsx-runtime";
import Spacing from "@shared/components/Spacing";
import withAsyncBoundary from "@shared/hocs/withAsyncBoundary";

function HotelList() {
  const { data, loadMore, hasNextPage, isFetching } = useHotels();

  console.log({ data, loadMore, hasNextPage, isFetching });
  // if (data == null) {
  //   return <HotelSkeleton />;
  // }

  return (
    <div>
      <InfiniteScroll
        dataLength={data.length}
        hasMore={hasNextPage}
        loader={<HotelSkeleton size={4} />}
        next={loadMore}
        scrollThreshold="100px">
        {data.map((hotel, idx) => (
          <Fragment key={hotel.id}>
            <ListRow
              contents={<ListRow.Texts title={hotel.name} subTitle={hotel.comment} />}
              right={
                <Flex direction="column">
                  <Flex direction="column">
                    <Image src={hotel.image} />
                  </Flex>
                  <Text size="t6">{hotel.price}원</Text>
                </Flex>
              }
            />
            {data.length - 1 === idx ? null : <Spacing />}
          </Fragment>
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default withAsyncBoundary(HotelList, {
  rejectedFallback: ({ error, reset }) => <h1>에러가 발생했어요.</h1>,
  pendingFallback: <HotelSkeleton size={4} />,
});
