export type Owner = {
    MailingAddress: string;
    MailingAddress2: string;
    MailingCity: string;
    MailingZip: string;
    EnableEmail: boolean;
    EnableMail: boolean;
    EnableTextMessage: boolean;
    EnableVoiceMessage: boolean;
    EnableEmailBilling: boolean;
    EnablePaperBilling: boolean;
    PrimaryPhoneNumber: string;
    OwnerFirstName: string;
    OwnerLastName: string;
    OwnerEmail: string;
    DayPhone: string;
    NightPhone: string;
    CellPhone1: string;
    CellPhone2: string;
    OtherPhone: string;
    MailingState: string;
    MailingCountryCode: string;
    MailingProvence: string;
    AssociationIdEncrypted: string;
    CreatedByUserIdEncrypted: string;
}

export type Unit = {
    AssociationIdEncrypted: string;
    UnitCity: string;
    UnitZip: string;
    UnitState: string;
    UnitTypeCodeEidEncrypted: string;
    UnitAddressStreet: string;
    UnitAddressNumber: string;
}

export type ClientKey = {
    AssociationIdEncrypted: string;
    ManagementIdEncrypted: string;
    UserIdEncrypted: string;
}

export type OwnerUnitData = {
    owner: Owner;
    unit: Unit;
    clientKey: ClientKey;
    closingDate: string | null;
}