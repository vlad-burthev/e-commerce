import { useAddRateMutation } from "@/services/deviceApi";
import { useAppSelector } from "@/store/store";
import { useState, type FC, useEffect } from "react";

type T_DeviceRate = {
  userId: number;
  mark: number;
};

interface DeviceRateProps {
  deviceRate: any[];
  deviceId?: number;
  disabled?: boolean;
}

const DeviceRate: FC<DeviceRateProps> = ({
  deviceRate,
  deviceId,
  disabled = false,
}) => {
  const rating = [0, 1, 2, 3, 4];
  const [averageRate, setAverageRate] = useState<Number>(0);

  const { user, isLogin } = useAppSelector((state) => state.user);
  const userMark = deviceRate.filter((m) => m.userId === user.id)[0];

  const [hasUserRate, setHasUserRate] = useState(false);

  useEffect(() => {
    if (deviceRate.length !== 0) {
      const averageRate =
        deviceRate.reduce((acc, cur) => acc + cur.mark, 0) / deviceRate.length;
      setAverageRate(averageRate);

      const hasUserRateHandler = deviceRate.some(
        (deviceRate) => deviceRate.userId === user.id
      );
      setHasUserRate(hasUserRateHandler);
    }
  }, [deviceRate]);

  const [addRate] = useAddRateMutation();

  const addRateHandler = async ({ mark }: any) => {
    if (isLogin && deviceId) {
      const token = localStorage.getItem("token");
      console.log({ deviceId, mark, token });

      await addRate({ deviceId, mark, token });
    }
  };

  return (
    <div className="flex" style={{ pointerEvents: disabled ? "none" : "auto" }}>
      {deviceRate.length === 0
        ? rating.map((mark) => (
            <button
              disabled={disabled}
              onClick={() => addRateHandler({ mark: mark + 1 })}
              key={mark}
            >
              <svg
                height="20px"
                width="20px"
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 47.94 47.94"
              >
                <path
                  d="M26.285,2.486l5.407,10.956c0.376,0.762,1.103,1.29,1.944,1.412l12.091,1.757
c2.118,0.308,2.963,2.91,1.431,4.403l-8.749,8.528c-0.608,0.593-0.886,1.448-0.742,2.285l2.065,12.042
c0.362,2.109-1.852,3.717-3.746,2.722l-10.814-5.685c-0.752-0.395-1.651-0.395-2.403,0l-10.814,5.685
c-1.894,0.996-4.108-0.613-3.746-2.722l2.065-12.042c0.144-0.837-0.134-1.692-0.742-2.285l-8.749-8.528
c-1.532-1.494-0.687-4.096,1.431-4.403l12.091-1.757c0.841-0.122,1.568-0.65,1.944-1.412l5.407-10.956
C22.602,0.567,25.338,0.567,26.285,2.486z"
                  fill="gray"
                />
              </svg>
            </button>
          ))
        : rating.map((mark) => (
            <button
              onClick={() => addRateHandler({ mark: mark + 1 })}
              key={mark}
            >
              <svg
                height="20px"
                width="20px"
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 47.94 47.94"
              >
                <path
                  d="M26.285,2.486l5.407,10.956c0.376,0.762,1.103,1.29,1.944,1.412l12.091,1.757
	c2.118,0.308,2.963,2.91,1.431,4.403l-8.749,8.528c-0.608,0.593-0.886,1.448-0.742,2.285l2.065,12.042
	c0.362,2.109-1.852,3.717-3.746,2.722l-10.814-5.685c-0.752-0.395-1.651-0.395-2.403,0l-10.814,5.685
	c-1.894,0.996-4.108-0.613-3.746-2.722l2.065-12.042c0.144-0.837-0.134-1.692-0.742-2.285l-8.749-8.528
	c-1.532-1.494-0.687-4.096,1.431-4.403l12.091-1.757c0.841-0.122,1.568-0.65,1.944-1.412l5.407-10.956
	C22.602,0.567,25.338,0.567,26.285,2.486z"
                  fill={
                    hasUserRate && userMark.mark > mark
                      ? "green"
                      : averageRate > mark
                      ? "#ffba00"
                      : "gray"
                  }
                />
              </svg>
            </button>
          ))}
    </div>
  );
};

export default DeviceRate;
