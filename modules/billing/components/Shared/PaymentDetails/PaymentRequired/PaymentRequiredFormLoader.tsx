import { Skeleton, SkeletonGrid } from '@shared/components';

export const PaymentRequiredFormLoader = () => {
  return (
    <>
      <SkeletonGrid padding="0 0 40px">
        <Skeleton width="140px" height="30px" margin="0 0 7px" />
        <Skeleton width="80%" height="35px" />
      </SkeletonGrid>

      <SkeletonGrid padding="0 0 20px">
        <Skeleton width="140px" height="30px" margin="0 0 7px" />
        <Skeleton width="80%" height="35px" />
        <Skeleton width="80%" height="35px" />
        <Skeleton width="80%" height="35px" />
      </SkeletonGrid>

      <SkeletonGrid>
        <Skeleton width="188px" height="35px" />
      </SkeletonGrid>
    </>
  );
};
