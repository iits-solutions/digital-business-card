from smartcard.System import readers
from smartcard.util import toHexString
from smartcard.Exceptions import CardConnectionException, NoCardException


GET_UID = [0xFF, 0xCA, 0x00, 0x00, 0x00]


def main():
    print("========================================")
    print("       iLinq.Team NFC CARD INFO TEST")
    print("========================================")
    print()
    print("READ-ONLY DIAGNOSTIC")
    print("No data will be written to the card.")
    print()

    available_readers = readers()

    if not available_readers:
        print("ERROR: No smart card readers detected.")
        return

    print("Available readers:")

    for index, reader in enumerate(available_readers):
        print(f"  {index}: {reader}")

    print()

    reader = None

    for available_reader in available_readers:
        if "ACR122" in str(available_reader).upper():
            reader = available_reader
            break

    if reader is None:
        reader = available_readers[0]

    print(f"Using reader: {reader}")
    print()
    print("Connect the NFC card to the reader...")
    print()

    connection = reader.createConnection()

    try:
        protocol = connection.connect()

        print("CARD CONNECTED")
        print("----------------------------------------")

        print(f"Protocol: {protocol}")

        atr = connection.getATR()

        print(f"ATR:      {toHexString(atr)}")

        print()

        print("Reading UID...")

        data, sw1, sw2 = connection.transmit(GET_UID)

        print(f"Response: {toHexString(data)}")
        print(f"Status:   {sw1:02X} {sw2:02X}")

        if sw1 == 0x90 and sw2 == 0x00:
            uid = toHexString(data).replace(" ", "")

            print()
            print("UID:")
            print(uid)

        else:
            print()
            print("UID command did not return success.")

        print()
        print("----------------------------------------")
        print("CARD DIAGNOSTIC COMPLETE")
        print("----------------------------------------")

    except NoCardException:
        print("ERROR: No NFC card is present.")

    except CardConnectionException as error:
        print("CARD CONNECTION ERROR:")
        print(error)

    except Exception as error:
        print("UNEXPECTED ERROR:")
        print(error)

    finally:
        try:
            connection.disconnect()
        except Exception:
            pass


if __name__ == "__main__":
    main()