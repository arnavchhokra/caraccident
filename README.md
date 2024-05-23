# Next.js Project Documentation

Welcome to the documentation for our Next.js project that facilitates Car Details, History, and Accident Management. This project provides a user-friendly interface for registering vehicles, managing ownership transfers, recording service history, and registering accidents. Below, you'll find detailed information on the project structure, functionalities, and usage.

## Project Overview

This Next.js project integrates with an Ethereum smart contract deployed on the blockchain to manage car-related data. It provides various features accessible through different routes to interact with the smart contract functionalities.

## Project Structure

```
nextjs-project/
|-- src/
|   |-- app/
|   |   |-- vehicle/
|   |   |-- service/
|   |   |-- accident/
|   |-- components/
|   |-- public/
|       |-- images/
|           |-- ...
|   |-- ...
|-- README.md
|-- package.json
```

- **src**: Contains the source code of the Next.js application.
  - **app**: Contains the Next.js pages corresponding to different routes in the application.
  - **components**: Contains reusable React components used across the application.


## Installation

1. Clone the repository:

```
git clone https://github.com/arnavchhokra/caraccident
```

2. Navigate to the project directory:

```
cd caraccident
```

3. Install dependencies:

```
npm install
```

## Usage

### Starting the Development Server

To start the development server, run:

```
npm run dev
```

This will start the Next.js development server on `http://localhost:3000`.


### Routes and Functionality


### Home Page (`/`)

- **Functionality**:
  - Displays a list of all registered vehicles.
  - Shows each vehicle's history, which may include service records and accident details.
  - Allows encryption of vehicle data, making it inaccessible without decryption.

- **Encryption and Decryption**:
  - Vehicle data encryption:
    - Users can choose to encrypt their vehicle data during registration by providing a password.
    - Encrypting vehicle data costs 3 Matic tokens.
  - Decryption:
    - Decrypting vehicle data requires 2 Matic tokens.
    - Decryption is necessary to view encrypted vehicle data on the home page.

### Register Vehicle (`/vehicle/register`)

- **Functionality**:
  - Allows users to register a new vehicle by providing owner name, car name, and optionally encrypting data.
  - Users can choose to encrypt their vehicle data during registration by providing a password.
  - Once registered, the vehicle appears on the home page along with its details.

- **Encryption and Decryption**:
  - Vehicle data encryption:
    - Users can choose to encrypt their vehicle data during registration by providing a password.
    - Encrypting vehicle data costs 3 Matic tokens.
  - Decryption:
    - Decrypting vehicle data requires 2 Matic tokens.
    - Decryption is necessary to view encrypted vehicle data on the home page.

### Transfer Ownership (`/vehicle/transfer`)

- **Functionality**:
  - Allows owners to transfer ownership of a vehicle to another user.
  - Requires the owner to specify the vehicle ID and the new owner's address.
  - After successful transfer, the vehicle ownership changes accordingly.

### View Vehicles (`/vehicle/view`)

- **Functionality**:
  - Displays a list of all registered vehicles along with their details.
  - Allows users to view details such as owner name, car name, and whether the data is encrypted.

### Battery Service (`/service/battery`)

- **Functionality**:
  - Allows registered garages to register battery servicing details for a specific vehicle.
  - Garages can record service date, battery level, and whether the issue is fixed.

### Basic Service (`/service/basic`)

- **Functionality**:
  - Allows registered garages to register basic servicing details for a specific vehicle.
  - Garages can record service date, servicing level, parts fixed, drivability status, and explanation of service.

### Engine Service (`/service/engine`)

- **Functionality**:
  - Allows registered garages to register engine servicing details for a specific vehicle.
  - Garages can record service date, engine servicing level, and whether the issue is fixed.

### Register Accident (`/accident/register`)

- **Functionality**:
  - Allows registered accident resolution centers to register accident details for a specific vehicle.
  - Resolution centers can record accident date and parts broken in the accident.

### Encryption and Decryption

- **Encryption**:
  - Users can choose to encrypt their vehicle data during registration by providing a password.
  - Encrypting vehicle data costs 3 Matic tokens.
  - Encryption ensures that sensitive vehicle data remains secure on the blockchain.

- **Decryption**:
  - Decrypting vehicle data requires 2 Matic tokens.
  - Decryption is necessary to view encrypted vehicle data on the home page.
  - Decryption ensures that authorized users can access and view encrypted vehicle data.



### Smart Contract 


Smart Contract Address
```
https://amoy.polygonscan.com/address/0x4c304df050df16ee92ef5037290c10cd19f35128
```

#### User Management

- `registerUser(string memory _userName, uint no, string memory _emergency) public`: Registers a new user with a username, user type, and emergency contact.
- `checkUser() public view returns(bool)`: Checks if the caller is a registered user.

#### Vehicle Management

- `registerCar(string memory _ownerName, string memory _carName, bool _isEncrypted) payable public returns(uint)`: Registers a new vehicle with owner name, car name, and encryption flag. Requires payment for encryption.
- `tranferCar(uint _ID, uint _personalID, address _newOwner) public`: Transfers ownership of a vehicle to another user.
- `getAllCars() public view returns (Car[] memory)`: Retrieves details of all registered vehicles.

#### Service Management

- `setBatteryService(uint _carId, string memory _date, uint _level , bool _isfixed) public`: Records battery servicing details for a vehicle.
- `setEngineService(uint _carId, string memory _serviceDate, uint _level, bool _isfixed) public`: Records engine servicing details for a vehicle.
- `setBasicService(uint _carId, string memory _serviceDate, uint _level, string memory _partsFixed, bool _isDriveable, string memory _explainService ) public`: Records basic servicing details for a vehicle.
- `getEngineService(uint _carId) public view returns(Engine[] memory)`: Retrieves engine servicing history for a vehicle.
- `getBatteryService( uint _carId) public view  returns(Battery[] memory)`: Retrieves battery servicing history for a vehicle.
- `getServiceHistory(uint _carId) public view returns(Service[] memory)`: Retrieves complete service history for a vehicle.

#### Accident Management

- `registerAccident(uint _carId, string memory _accidentDate, string memory _partsBroken) public`: Registers an accident for a vehicle.
- `getAccidentHistory(uint _carId) public view returns(Accident[] memory)`: Retrieves accident history for a vehicle.

#### Encryption and Decryption

- `decrypt(uint _carID) public payable returns (bool)`: Decrypts the encrypted data of a vehicle.
- `approveProvider(string memory _password) public`: Approves a third-party or accident resolution provider.
- `blacklistProvider(address _user) public`: Blacklists a provider.

### Encryption and Decryption

- **Encryption**:
  - Vehicle data can be encrypted during registration by setting the `_isEncrypted` flag to `true`.
  - Encryption ensures that vehicle data remains secure on the blockchain.
  - Encrypting vehicle data costs 3 Matic tokens.

- **Decryption**:
  - Decryption of encrypted vehicle data is required to access the information.
  - Decryption functionality is available through the `decrypt` function.
  - Decryption requires payment of 2 Matic tokens.

 
## Contributing

We welcome contributions from the community. Feel free to open issues or submit pull requests to help improve this project.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

## Support

For any queries or support, please contact [support@example.com](mailto:support@example.com).

---

This concludes the documentation for our Next.js project. Happy coding! 🚀
