import React from "react";
import { MAX_MISTAKES } from "../../../lib/constants";
import { Info } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import BaseModal from "../BaseModal";

function InfoModal() {
  return (
    <BaseModal
      title=""
      trigger={<Info className="icon-trigger" strokeWidth={1.75} />}
      initiallyOpen={false}
      actionButtonText="Tuigim"
    >
      <Tabs defaultValue="how-to-play">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="how-to-play">Conas Imirt</TabsTrigger>
          <TabsTrigger value="about-us">Faoi</TabsTrigger>
        </TabsList>
        <TabsContent value="how-to-play">
          {" "}
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Cad é an sprioc?</AccordionTrigger>
              <AccordionContent>
                Aimsiġ ceiṫre gṙúpa focal a ḃfuil ceangal rúnda eatarṫu.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Conas a imrím?</AccordionTrigger>
              <AccordionContent>
                Roġnaiġ ceiṫre focail ⁊ brúiġ “Seol” le do roġa a
                ṡeiceáil.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Cé ṁéad botún atá agam?</AccordionTrigger>
              <AccordionContent>
                {`Tá ${MAX_MISTAKES} ḃotún agat sula gcríoċnaíonn an cluiċe.`}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>
        <TabsContent value="about-us">
          {" "}
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Cad é Ceangal?</AccordionTrigger>
              <AccordionContent>
                Is cluiċe focal Ġaeilge é Ceangal faoi ṗatrúin, coṁṫéacs
                ⁊ na naisc ḃeaga idir focail.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Cén fáṫ Gaeilge?</AccordionTrigger>
              <AccordionContent>
                Ċun cúis ḃeag laeṫúil a taḃairt d’imreoirí focail
                Ġaeilge a ḟeiceáil, a ṁeascaḋ ⁊ a ċeangal le ċéile.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Cad iad na daṫanna?</AccordionTrigger>
              <AccordionContent>
                Léiríonn na daṫanna na gṙúpaí réitiṫe. Ní gá iad a ṫuiscint
                roiṁ ré, aċ cabḣraíonn siad leis an torad a léaṁ.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>
      </Tabs>
    </BaseModal>
  );
}

export default InfoModal;
