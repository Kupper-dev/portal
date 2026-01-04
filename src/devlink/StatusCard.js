"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { StatusRow } from "./StatusRow";

export function StatusCard({
  as: _Component = _Builtin.Block,
  statusRow1Step1State = null,
  statusRow1Alert = false,
  statusRow1StatusStatusButton1 = false,
  statusRow1StatusActionPopup = false,
  statusRow1StatusStatusMessage = "Message",
  statusRow1StatusDate = "DD/MM/YY",
  statusRow1StatusHour = "00:00",
  statusRow1AlertMessageText = "Alert message",
  statusRow2Step2State = null,
  statusRow2Alert = false,
  statusRow2StatusStatusButton1 = false,
  statusRow2StatusActionPopup = false,
  statusRow2StatusStatusMessage = "Message",
  statusRow2StatusDate = "DD/MM/YY",
  statusRow2StatusHour = "00:00",
  statusRow2AlertMessageText = "Alert message",
  statusRow3StatusActionPopup = false,
  statusRow3StatusStatusButton1 = false,
  statusRow3Step3State = null,
  statusRow3Alert = false,
  statusRow3StatusStatusMessage = "Message",
  statusRow3StatusDate = "DD/MM/YY",
  statusRow3StatusHour = "00:00",
  statusRow3AlertMessageText = "Alert message",
  statusRow4Step4State = null,
  statusRow4StatusStatusButton1 = false,
  statusRow4StatusActionPopup = false,
  statusRow4Alert = true,
  statusRow4StatusStatusMessage = "Message",
  statusRow4StatusDate = "DD/MM/YY",
  statusRow4StatusHour = "00:00",
  statusRow4AlertMessageText = "Alert message",
  statusRow5Step5State = null,
  statusRow5StatusStatusButton1 = false,
  statusRow5StatusActionPopup = false,
  statusRow5Alert = true,
  statusRow5StatusStatusMessage = "Message",
  statusRow5StatusDate = "DD/MM/YY",
  statusRow5StatusHour = "00:00",
  statusRow5AlertMessageText = "Alert message",
  statusRow6Step6State = null,
  statusRow6StatusStatusButton1 = false,
  statusRow6StatusActionPopup = false,
  statusRow6Alert = true,
  statusRow6StatusStatusMessage = "Message",
  statusRow6StatusDate = "DD/MM/YY",
  statusRow6StatusHour = "00:00",
  statusRow6AlertMessageText = "Alert message",
  statusRow7Step7State = null,
  statusRow7StatusStatusButton1 = false,
  statusRow7StatusActionPopup = false,
  statusRow7Alert = true,
  statusRow7StatusStatusMessage = "Message",
  statusRow7StatusDate = "DD/MM/YY",
  statusRow7StatusHour = "00:00",
  statusRow7AlertMessageText = "Alert message",
}) {
  return (
    <_Component className="status_card" tag="div">
      <_Builtin.Block
        className="card_header"
        id="w-node-_02411535-3dae-dd64-05b0-67e9b623cbc6-b623cbc5"
        tag="div"
      >
        <_Builtin.Heading tag="h4">{"Status del servicio"}</_Builtin.Heading>
      </_Builtin.Block>
      <_Builtin.Block
        className="spacer_1_rem"
        id="w-node-_02411535-3dae-dd64-05b0-67e9b623cbc9-b623cbc5"
        tag="div"
      />
      <StatusRow
        variant={statusRow1Step1State}
        alert={statusRow1Alert}
        statusStatusActionButton={statusRow1StatusStatusButton1}
        statusActionPopup={statusRow1StatusActionPopup}
        statusStatusMessage={statusRow1StatusStatusMessage}
        statusDate={statusRow1StatusDate}
        statusHour={statusRow1StatusHour}
        alertMessageText={statusRow1AlertMessageText}
      />
      <StatusRow
        variant={statusRow2Step2State}
        alert={statusRow2Alert}
        statusStatusActionButton={statusRow2StatusStatusButton1}
        statusActionPopup={statusRow2StatusActionPopup}
        statusStatusMessage={statusRow2StatusStatusMessage}
        statusDate={statusRow2StatusDate}
        statusHour={statusRow2StatusHour}
        alertMessageText={statusRow2AlertMessageText}
        statusTitle="Dispositivo en revisión "
      />
      <StatusRow
        statusActionPopup={statusRow3StatusActionPopup}
        statusStatusActionButton={statusRow3StatusStatusButton1}
        variant={statusRow3Step3State}
        alert={statusRow3Alert}
        statusStatusMessage={statusRow3StatusStatusMessage}
        statusDate={statusRow3StatusDate}
        statusHour={statusRow3StatusHour}
        alertMessageText={statusRow3AlertMessageText}
        statusTitle="Revisa tu diagnóstico"
      />
      <StatusRow
        variant={statusRow4Step4State}
        statusStatusActionButton={statusRow4StatusStatusButton1}
        statusActionPopup={statusRow4StatusActionPopup}
        alert={statusRow4Alert}
        statusStatusMessage={statusRow4StatusStatusMessage}
        statusDate={statusRow4StatusDate}
        statusHour={statusRow4StatusHour}
        alertMessageText={statusRow4AlertMessageText}
        statusTitle="Refacciones en camino"
      />
      <StatusRow
        variant={statusRow5Step5State}
        statusStatusActionButton={statusRow5StatusStatusButton1}
        statusActionPopup={statusRow5StatusActionPopup}
        alert={statusRow5Alert}
        statusStatusMessage={statusRow5StatusStatusMessage}
        statusDate={statusRow5StatusDate}
        statusHour={statusRow5StatusHour}
        alertMessageText={statusRow5AlertMessageText}
        statusTitle="Inicia reparación"
      />
      <StatusRow
        variant={statusRow6Step6State}
        statusStatusActionButton={statusRow6StatusStatusButton1}
        statusActionPopup={statusRow6StatusActionPopup}
        alert={statusRow6Alert}
        statusStatusMessage={statusRow6StatusStatusMessage}
        statusDate={statusRow6StatusDate}
        statusHour={statusRow6StatusHour}
        alertMessageText={statusRow6AlertMessageText}
        statusTitle="Lista para recolección"
      />
      <StatusRow
        variant={statusRow7Step7State}
        statusStatusActionButton={statusRow7StatusStatusButton1}
        statusActionPopup={statusRow7StatusActionPopup}
        alert={statusRow7Alert}
        statusStatusMessage={statusRow7StatusStatusMessage}
        statusDate={statusRow7StatusDate}
        statusHour={statusRow7StatusHour}
        alertMessageText={statusRow7AlertMessageText}
        statusTitle="Dispositivo entregado"
      />
    </_Component>
  );
}
