import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

function StatCounter({ end, suffix = "", duration = 2 }) {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <div ref={ref}>
      {inView && (
        <CountUp
          end={end}
          duration={duration}
          suffix={suffix}
          separator=","
        />
      )}
    </div>
  );
}

export default StatCounter;