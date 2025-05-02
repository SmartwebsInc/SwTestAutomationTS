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

export type HoaDetails = {
    $id: string;
    Name: string;
    AssociationLongName: string;
    Address1: string;
    City: string;
    State: string;
    Zip: string;
    TimeZoneOffset: number;
    PreferredStartDate: string;
    IsImport: boolean;
    IsMultiOwnerEnabled: boolean;
    IsNameUnique: boolean;
}

export type ProductSettings = {
    General: {
        BoardHearingEnabled: boolean;
    };
    SmartBooks: {
        SmartAccountingEnabled: boolean;
        SecurityDepositEnabled: boolean;
        FiscalStartMonth: number;
        WrapBudgetByFiscalMonth: boolean;
        ImportCollectionSetup: boolean;
        ImportStatementSetup: boolean;
        ImportVendors: boolean;
    };
    SmartArc: {
        SmartArchitecturalsEnabled: boolean;
    };
    SmartVio: {
        SmartViolationsEnabled: boolean;
        ViolationEmailsOn: boolean;
        MultiViolationEnabled: boolean;
        MapsEnabled: boolean;
        SingleViolDisplayLetter: boolean;
        TenantEmail: boolean;
        TenantCertified: boolean;
        TenantFirstClass: boolean;
        ViolLetterToAltAddress: boolean;
        AltAddressEmail: boolean;
        AltAddressFirstClass: boolean;
        AltAddressCertified: boolean;
        FirstClassMailing: boolean;
        CertifiedMailing: boolean;
        FirstClassColor: boolean;
        CertifiedColor: boolean;
        EmailOnPrint: boolean;
        ViolationDurationPeriod: number;
    };
    SmartWO: {
        SmartWorkOrdersEnabled: boolean;
    };
    SmartComm: {
        SmartCommunicationsEnabled: boolean;
    };
    SmartPortals: {
        ResidentPortalEnabled: boolean;
    };
    GlobalReporting: {
        GlobalReportingEnabled: boolean;
    };
    Community: {
        SmartCommunityEnabled: boolean;
    };
}

export type UserSettings = {
    tab: string;
    SelectedUsers: {
        $id: string;
        $values: any[];
    };
    SelectedRoles: {
        $id: string;
        $values: any[];
    };
    NewUsers: {
        $id: string;
        $values: any[];
    };
    IsManagementRolesOnly: boolean;
    ShowAllContacts: boolean;
    AddCurrentUser: boolean;
    AssociationIdEncrypted: string;
}

export type GeoCodeSettings = {
    IsEnabled: boolean;
    DayOfWeek: number;
    Hour: number;
}

export type AssociationRequest = {
    $id: string;
    hoaDetails: HoaDetails;
    productSettings: ProductSettings;
    userSettings: UserSettings;
    geoCodeSettings: GeoCodeSettings;
    markSiteLive: boolean;
}