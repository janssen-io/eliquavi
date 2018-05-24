export interface ITransaction {
    id?: number;
    Date: Date;
    Account: string;
    ContraAccount: string;
    Amount: number;
    Description: string;
    Mutation: Mutation;
}

export enum Mutation {
    CreditSlip, // AcceptGiro - AC
    Collection, // Incasso - IC 
    Atm, // Geldautomaat - GM
    Transfer, // Overschrijving - OV
    Cheque, // Cheque - CH
    Withdrawal, // Opname (kantoor) - PK
    Miscellaneous, // Diversen - DV
    PeriodicTransfer, // Periodieke overschrijving - PO
    Interest, // Rente - R
    Reservation, // Reservering - RV
    PointOfSale, // Betaalautomaat - BA
    InternetBanking, // Internet bankieren - GT
    TeleBanking, // Telefonisch bankieren - GF
    Batch, // Verzamelbetaling - VZ
    // ?? Overschrijvingskaart - GB
}