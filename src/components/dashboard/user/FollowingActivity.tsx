import { Accordion, AccordionItem } from "@nextui-org/accordion";
import Following from "../../UI/Following";
import Follwers from "../../UI/Follwers";
import { MoonFilledIcon, SunFilledIcon } from "@/src/assets/icons";

export default function App() {

    return (
        <Accordion>
            <AccordionItem indicator={({ isOpen }) => (isOpen ? '' : '')}
                key="1" aria-label="All Followers" title="All Followers">
                <Follwers />
            </AccordionItem>
            <AccordionItem key="2" aria-label="ALl Following" title="All Followers">
                <Following />
            </AccordionItem>

        </Accordion>
    );
}