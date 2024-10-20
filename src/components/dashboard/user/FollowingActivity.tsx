import { Accordion, AccordionItem } from "@nextui-org/accordion";

import Following from "../../UI/Following";
import Follwers from "../../UI/Follwers";

export default function App() {
  return (
    <Accordion>
      <AccordionItem
        key="1"
        aria-label="All Followers"
        indicator={({ isOpen }) => (isOpen ? "" : "")}
        title="All Followers"
      >
        <Follwers />
      </AccordionItem>
      <AccordionItem key="2" aria-label="ALl Following" title="All Followers">
        <Following />
      </AccordionItem>
    </Accordion>
  );
}
