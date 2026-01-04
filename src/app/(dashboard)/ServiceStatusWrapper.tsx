
'use client';

import * as React from 'react';
import { ServicesDetailsAndStatus } from '@/devlink';
import { ServiceItem, DeviceItem, formatDate, formatTime } from '@/lib/service-types';
import { acceptDiagnosis } from '@/app/actions/service-actions';
import { getStepVariant, getStatusMessage, getAlertConfig } from '@/lib/status-logic';

interface ServiceStatusWrapperProps {
    items: {
        service: ServiceItem;
        device: DeviceItem | null;
    }[];
}

export default function ServiceStatusWrapper({ items }: ServiceStatusWrapperProps) {
    if (!items || items.length === 0) {
        return <div className="p-4 text-center">No active service found.</div>;
    }

    return (
        <div className="flex flex-col gap-8">
            {items.map(({ service: s, device: d }) => {
                const handleAccept = async (e: any) => {
                    e.preventDefault();
                    if (confirm('¿Estás seguro que deseas aceptar la reparación?')) {
                        await acceptDiagnosis(s.podio_item_id);
                    }
                };

                // Button Visibility Logic
                const showButtons = getStepVariant(s.status, 3) === 'active';
                const showPopup = getStepVariant(s.status, 3) === 'active';

                const alert1 = getAlertConfig(s, 1);
                const alert2 = getAlertConfig(s, 2);
                const alert3 = getAlertConfig(s, 3);
                const alert4 = getAlertConfig(s, 4);
                const alert5 = getAlertConfig(s, 5);
                const alert6 = getAlertConfig(s, 6);
                const alert7 = getAlertConfig(s, 7);

                return (
                    <ServicesDetailsAndStatus
                        key={s.podio_item_id}

                        devicesDeviceBrandModel={d?.brandmodel || "Unknown Device"}
                        devicesSerial={d?.serial || "N/A"}

                        // Service Info
                        servicesRequestOrIssue={s.servicetype || "No info"}
                        servicesDataBackup={s.databackup || "No"}
                        servicesPowerAdapter={s.poweradapter || "No"}
                        servicesAccessories={s.accessories || "None"}
                        servicesObservations={s.observations || "None"}
                        servicesPrice={s.advancepayment || "Pending"}

                        servicePodioItemIdFormatted={s.podio_formatted_id}

                        // Dates & Times
                        servicesDate={formatDate(s.date)}

                        // Status Dates
                        statusRow1StatusDate={formatDate(s.datereceived || s.date)}
                        statusRow2StatusDate={formatDate(s.datecheckupstart || "")}
                        statusRow3StatusDate={formatDate(s.datediagnosed || "")}
                        statusRow4StatusDate={formatDate(s.datepartsordered || "")}
                        statusRow5StatusDate={formatDate(s.daterepairstart || "")}
                        statusRow6StatusDate={formatDate(s.daterepairready || "")}
                        statusRow7StatusDate={formatDate(s.datedevicedelivered || "")}

                        // Status Hours
                        statusRow1StatusHour={formatTime(s.datereceived || s.date)}
                        statusRow2StatusHour={formatTime(s.datecheckupstart || "")}
                        statusRow3StatusHour={formatTime(s.datediagnosed || "")}
                        statusRow4StatusHour={formatTime(s.datepartsordered || "")}
                        statusRow5StatusHour={formatTime(s.daterepairstart || "")}
                        statusRow6StatusHour={formatTime(s.daterepairready || "")}
                        statusRow7StatusHour={formatTime(s.datedevicedelivered || "")}

                        // Alert Messages
                        statusRow1AlertMessageText={alert1.message}
                        statusRow2AlertMessageText={alert2.message}
                        statusRow3AlertMessageText={alert3.message}
                        statusRow4AlertMessageText={alert4.message}
                        statusRow5AlertMessageText={alert5.message}
                        statusRow6AlertMessageText={alert6.message}
                        statusRow7AlertMessageText={alert7.message}

                        // State Variants (Passing s.status)
                        statusRow1Step1State={getStepVariant(s.status, 1)}
                        statusRow2Step2State={getStepVariant(s.status, 2)}
                        statusRow3Step3State={getStepVariant(s.status, 3)}
                        statusRow4Step4State={getStepVariant(s.status, 4)}
                        statusRow5Step5State={getStepVariant(s.status, 5)}
                        statusRow6Step6State={getStepVariant(s.status, 6)}
                        statusRow7Step7State={getStepVariant(s.status, 7)}

                        // Alert Visibility
                        statusRow1Alert={alert1.show}
                        statusRow2Alert={alert2.show}
                        statusRow3Alert={alert3.show}
                        statusRow4Alert={alert4.show}
                        statusRow5Alert={alert5.show}
                        statusRow6Alert={alert6.show}
                        statusRow7Alert={alert7.show}

                        // Status Messages (Passing s.status)
                        statusRow1StatusStatusMessage={getStatusMessage(s.status, 1)}
                        statusRow2StatusStatusMessage={getStatusMessage(s.status, 2)}
                        statusRow3StatusStatusMessage={getStatusMessage(s.status, 3)}
                        statusRow4StatusStatusMessage={getStatusMessage(s.status, 4)}
                        statusRow5StatusStatusMessage={getStatusMessage(s.status, 5)}
                        statusRow6StatusStatusMessage={getStatusMessage(s.status, 6)}
                        statusRow7StatusStatusMessage={getStatusMessage(s.status, 7)}

                        // Button/Popup Visibility
                        statusRow3StatusActionPopup={showPopup}
                        statusRow3StatusStatusButton1={showButtons}

                        // Defaults
                        statusRow1StatusActionPopup={false}
                        statusRow1StatusStatusButton1={false}
                        statusRow2StatusActionPopup={false}
                        statusRow2StatusStatusButton1={false}
                        statusRow4StatusActionPopup={false}
                        statusRow4StatusStatusButton1={false}
                        statusRow5StatusActionPopup={false}
                        statusRow5StatusStatusButton1={false}
                        statusRow6StatusActionPopup={false}
                        statusRow6StatusStatusButton1={false}
                        statusRow7StatusActionPopup={false}
                        statusRow7StatusStatusButton1={false}

                        // Actions
                        servicesDiagnosis={{ href: s.diagnosis || "#", target: "_blank" }}
                        servicesDiagnosisAcceptance={{ href: "#", onClick: handleAccept } as any}
                    />
                );
            })}
        </div>
    );
}
