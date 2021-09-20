import { GetServerSideProps } from "next";
import { basePagePropsServerSide } from "../ui/hocs/base/BasePage.hoc";
import LandingPage from "./landing";
export const getServerSideProps: GetServerSideProps = basePagePropsServerSide;
export default LandingPage;
