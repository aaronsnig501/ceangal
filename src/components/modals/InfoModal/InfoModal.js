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
                Aimsigh ceithre ghrúpa focal a bhfuil ceangal rúnda eatarthu.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Conas a imrím?</AccordionTrigger>
              <AccordionContent>
                Roghnaigh ceithre fhocal agus brúigh “Seol” le do rogha a
                sheiceáil.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Cé mhéad botún atá agam?</AccordionTrigger>
              <AccordionContent>
                {`Tá ${MAX_MISTAKES} bhotún agat sula gcríochnaíonn an cluiche.`}
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
                Is cluiche focal Gaeilge é Ceangal faoi phatrúin, comhthéacs
                agus na naisc bheaga idir focail.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Cén fáth Gaeilge?</AccordionTrigger>
              <AccordionContent>
                Chun cúis bheag laethúil a thabhairt d’imreoirí focail
                Ghaeilge a fheiceáil, a mheascadh agus a cheangal le chéile.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Cad iad na dathanna?</AccordionTrigger>
              <AccordionContent>
                Léiríonn na dathanna na grúpaí réitithe. Ní gá iad a thuiscint
                roimh ré, ach cabhraíonn siad leis an toradh a léamh.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>
      </Tabs>
    </BaseModal>
  );
}

export default InfoModal;
