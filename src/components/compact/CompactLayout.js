import { Outlet } from "react-router-dom";

// ----------------------------------------------------------------------

export default function CompactLayout() {
  return (
    <>
      <div component="main">
        <div
          style={{
            minHeight: "100vh",
            textAlign: "center",
            justifyContent: "center",
            backgroundColor: "whitesmoke",
            fontSize: "24px",
          }}
        >
          <Outlet />
        </div>
      </div>
    </>
  );
}
