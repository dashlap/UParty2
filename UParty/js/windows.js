//диалоговые окна
        // Переменные для хранения состояния
        let selectedSeats = [];
        let selectedTable = null;
        let selectedCoffeeTable = null;
        let currentPrice = 3200;
        let selectedPaymentMethod = null;
        let currentModal = null;
        let modalHistory = [];
        let currentSelectionType = null;

        // Инициализация при загрузке страницы
        document.addEventListener('DOMContentLoaded', function() {
            generateSeats();
            generateTables();
            generateCoffeeTables();
        });

        // Генерация мест в театре
        function generateSeats() {
            const container = document.getElementById('seatsContainer');
            container.innerHTML = '';
            
            for (let row = 1; row <= 7; row++) {
                for (let seatNum = 1; seatNum <= 14; seatNum++) {
                    const seat = document.createElement('div');
                    seat.className = 'seat';
                    seat.textContent = seatNum;
                    seat.dataset.row = row;
                    seat.dataset.seat = seatNum;
                    
                    if (Math.random() < 0.2) {
                        seat.classList.add('occupied');
                    } else {
                        seat.addEventListener('click', toggleSeatSelection);
                    }
                    
                    container.appendChild(seat);
                }
            }
        }

        //  Генерация столиков в ресторане с новой структурой
        function generateTables() {
            const container = document.getElementById('tablesContainer');
            container.innerHTML = '';

            // Создаем столы с позиционированием в сетке
            const tables = [
                { number: 1, type: 'square', className: 'table-1' },
                { number: 2, type: 'square', className: 'table-2' },
                { number: 3, type: 'square', className: 'table-3' },
                { number: 4, type: 'square', className: 'table-4' },
                { number: 9, type: 'rectangle', className: 'table-9' },
                { number: 5, type: 'square', className: 'table-5' },
                { number: 6, type: 'square', className: 'table-6' },
                { number: 7, type: 'square', className: 'table-7' },
                { number: 8, type: 'square', className: 'table-8' },
                { number: 10, type: 'circle', className: 'table-10' },
                { number: 11, type: 'circle', className: 'table-11' },
                { number: 12, type: 'circle', className: 'table-12' },
                { number: 13, type: 'circle', className: 'table-13' },
                { number: 14, type: 'circle', className: 'table-14' }
            ];

            tables.forEach(table => {
                const tableItem = createTable(table.number, table.type, table.className);
                container.appendChild(tableItem);
            });
        }

        function createTable(number, type, className) {
            const tableItem = document.createElement('div');
            tableItem.className = `table-item ${className}`;
            tableItem.dataset.table = number;
            
            const tableShape = document.createElement('div');
            tableShape.className = `table-shape table-${type}`;
            tableShape.textContent = number;
            
            tableItem.appendChild(tableShape);
            
            if (Math.random() < 0.3) {
                tableItem.classList.add('occupied');
            } else {
                tableItem.addEventListener('click', toggleTableSelection);
            }
            
            return tableItem;
        }

        // Выбор/отмена выбора места в театре
        function toggleSeatSelection(event) {
            const seat = event.target;
            const row = seat.dataset.row;
            const seatNum = seat.dataset.seat;
            const seatId = `R${row}S${seatNum}`;
            
            if (seat.classList.contains('selected')) {
                seat.classList.remove('selected');
                selectedSeats = selectedSeats.filter(s => s !== seatId);
            } else {
                if (selectedSeats.length >= 1) {
                    alert('Вы можете выбрать только одно место');
                    return;
                }
                seat.classList.add('selected');
                selectedSeats.push(seatId);
            }
            
            updateSelectedSeatsInfo();
        }

        // Выбор/отмена выбора столика
        function toggleTableSelection(event) {
            const tableItem = event.currentTarget;
            const tableNumber = tableItem.dataset.table;
            
            if (tableItem.classList.contains('selected')) {
                tableItem.classList.remove('selected');
                selectedTable = null;
            } else {
                document.querySelectorAll('.table-item').forEach(table => {
                    table.classList.remove('selected');
                });
                
                tableItem.classList.add('selected');
                selectedTable = tableNumber;
            }
            
            updateRestaurantSelectionInfo();
        }

        // Обновление информации о выбранных местах в театре
        function updateSelectedSeatsInfo() {
            const selectedRow = document.getElementById('selectedRow');
            const selectedSeat = document.getElementById('selectedSeat');
            const totalPrice = document.getElementById('totalPrice');
            
            if (selectedSeats.length === 0) {
                selectedRow.textContent = '-';
                selectedSeat.textContent = '-';
                totalPrice.textContent = '0';
            } else {
                if (selectedSeats.length > 0) {
                    const seat = selectedSeats[0];
                    const row = seat.substring(1, seat.indexOf('S'));
                    const seatNum = seat.substring(seat.indexOf('S') + 1);
                    
                    selectedRow.textContent = row;
                    selectedSeat.textContent = seatNum;
                }
                totalPrice.textContent = currentPrice * selectedSeats.length;
            }
        }

        // Обновление информации о выбранном столике
        function updateRestaurantSelectionInfo() {
            const selectedTableElement = document.getElementById('selectedTable');
            const restaurantTotalPrice = document.getElementById('restaurantTotalPrice');
            
            if (!selectedTable) {
                selectedTableElement.textContent = '-';
                restaurantTotalPrice.textContent = '0';
            } else {
                selectedTableElement.textContent = selectedTable;
                restaurantTotalPrice.textContent = currentPrice;
            }
        }

        // Генерация столов для кофейни
        function generateCoffeeTables() {
            const container = document.getElementById('coffeeTablesContainer');
            const sideColumn = document.getElementById('coffeeSideColumn');
            container.innerHTML = '';
            sideColumn.innerHTML = '';

            // Основные столики 1-18
            const coffeeTables = [
                { number: 1, type: 'circle', className: 'coffee-table-1' },
                { number: 2, type: 'circle', className: 'coffee-table-2' },
                { number: 3, type: 'square', className: 'coffee-table-3' },
                { number: 4, type: 'square', className: 'coffee-table-4' },
                { number: 5, type: 'square', className: 'coffee-table-5' },
                { number: 6, type: 'square', className: 'coffee-table-6' },
                { number: 7, type: 'square', className: 'coffee-table-7' },
                { number: 8, type: 'square', className: 'coffee-table-8' },
                { number: 9, type: 'square', className: 'coffee-table-9' },
                { number: 10, type: 'square', className: 'coffee-table-10' },
                { number: 11, type: 'circle', className: 'coffee-table-11' },
                { number: 12, type: 'circle', className: 'coffee-table-12' },
                { number: 13, type: 'circle', className: 'coffee-table-13' },
                { number: 14, type: 'circle', className: 'coffee-table-14' },
                { number: 15, type: 'circle', className: 'coffee-table-15' },
                { number: 16, type: 'circle', className: 'coffee-table-16' },
                { number: 17, type: 'circle', className: 'coffee-table-17' },
                { number: 18, type: 'circle', className: 'coffee-table-18' }
            ];

            // Создаем столики 1-18
            coffeeTables.forEach(table => {
                const tableItem = createCoffeeTable(table.number, table.type, table.className);
                container.appendChild(tableItem);
            });

            // Создаем столики 19-23 в правом столбике
            for (let i = 19; i <= 23; i++) {
                const tableItem = document.createElement('div');
                tableItem.className = `coffee-side-table`;
                tableItem.textContent = i;
                tableItem.dataset.table = i;
                
                if (Math.random() < 0.3) {
                    tableItem.classList.add('occupied');
                } else {
                    tableItem.addEventListener('click', function() {
                        toggleCoffeeTableSelection(this);
                    });
                }
                
                sideColumn.appendChild(tableItem);
            }

            // Добавляем пустые места
            const emptySpaces = [
                { className: 'coffee-empty-1' },
                { className: 'coffee-empty-2' }
            ];

            emptySpaces.forEach(empty => {
                const emptyItem = document.createElement('div');
                emptyItem.className = `coffee-empty ${empty.className}`;
                container.appendChild(emptyItem);
            });
        }

        function createCoffeeTable(number, type, className) {
            const tableItem = document.createElement('div');
            tableItem.className = `coffee-table-item ${className}`;
            tableItem.dataset.table = number;
            
            const tableShape = document.createElement('div');
            tableShape.className = `coffee-table-shape coffee-table-${type}`;
            tableShape.textContent = number;
            
            tableItem.appendChild(tableShape);
            
            if (Math.random() < 0.3) {
                tableItem.classList.add('occupied');
            } else {
                tableItem.addEventListener('click', function() {
                    toggleCoffeeTableSelection(this);
                });
            }
            
            return tableItem;
        }

        function toggleCoffeeTableSelection(element) {
            const tableNumber = element.dataset.table;
            
            // Снимаем выделение со всех столиков
            document.querySelectorAll('.coffee-table-item, .coffee-side-table').forEach(table => {
                table.classList.remove('selected');
            });
            
            if (element.classList.contains('selected')) {
                element.classList.remove('selected');
                selectedCoffeeTable = null;
            } else {
                element.classList.add('selected');
                selectedCoffeeTable = tableNumber;
            }
            
            updateCoffeeSelectionInfo();
        }

        function updateCoffeeSelectionInfo() {
            const selectedTableElement = document.getElementById('selectedCoffeeTable');
            const coffeeTotalPrice = document.getElementById('coffeeTotalPrice');
            
            if (!selectedCoffeeTable) {
                selectedTableElement.textContent = '-';
                coffeeTotalPrice.textContent = '0';
            } else {
                selectedTableElement.textContent = selectedCoffeeTable;
                coffeeTotalPrice.textContent = currentPrice;
            }
        }

        function goToPaymentMethodFromCoffee() {
            if (!selectedCoffeeTable) {
                alert('Пожалуйста, выберите столик');
                return;
            }
            
            document.getElementById('coffeeSelectionModal').style.display = 'none';
            document.getElementById('paymentMethodModal').style.display = 'flex';
            
            document.getElementById('paymentDetails').innerHTML = `Столик <span id="paymentTable">${selectedCoffeeTable}</span>`;
            document.getElementById('paymentPrice').textContent = currentPrice;
            
            modalHistory.push('paymentMethodModal');
        }

        // Открытие окна выбора места в театре
        function openSeatSelection() {
            closeAllModals();
            currentSelectionType = 'theater';
            modalHistory = ['seatSelectionModal'];
            document.getElementById('seatSelectionModal').style.display = 'flex';
        }

        // Открытие окна выбора столиков в ресторане
        function openRestaurantSelection() {
            closeAllModals();
            currentSelectionType = 'restaurant';
            modalHistory = ['restaurantSelectionModal'];
            document.getElementById('restaurantSelectionModal').style.display = 'flex';
        }

        // Функция открытия кофейни
        function openSeatSelection2() {
            closeAllModals();
            currentSelectionType = 'coffee';
            modalHistory = ['coffeeSelectionModal'];
            document.getElementById('coffeeSelectionModal').style.display = 'flex';
        }

        // Переход к оплате из театра
        function goToPaymentMethod() {
            if (selectedSeats.length === 0) {
                alert('Пожалуйста, выберите место');
                return;
            }
            
            document.getElementById('seatSelectionModal').style.display = 'none';
            document.getElementById('paymentMethodModal').style.display = 'flex';
            
            // Обновляем информацию в окне оплаты
            if (selectedSeats.length > 0) {
                const seat = selectedSeats[0];
                const row = seat.substring(1, seat.indexOf('S'));
                const seatNum = seat.substring(seat.indexOf('S') + 1);
                document.getElementById('paymentRow').textContent = row;
                document.getElementById('paymentSeat').textContent = seatNum;
                document.getElementById('paymentDetails').innerHTML = `Ряд <span id="paymentRow">${row}</span>, Место <span id="paymentSeat">${seatNum}</span>`;
            }
            
            document.getElementById('paymentPrice').textContent = currentPrice * selectedSeats.length;
            modalHistory.push('paymentMethodModal');
        }

        // Переход к оплате из ресторана
        function goToPaymentMethodFromRestaurant() {
            if (!selectedTable) {
                alert('Пожалуйста, выберите столик');
                return;
            }
            
            document.getElementById('restaurantSelectionModal').style.display = 'none';
            document.getElementById('paymentMethodModal').style.display = 'flex';
            
            // Обновляем информацию в окне оплаты для ресторана
            document.getElementById('paymentDetails').innerHTML = `Столик <span id="paymentTable">${selectedTable}</span>`;
            document.getElementById('paymentPrice').textContent = currentPrice;
            
            modalHistory.push('paymentMethodModal');
        }

        // функция "Назад" для работы с обоими типами выбора
        function goBackToPreviousSelection() {
            document.getElementById('paymentMethodModal').style.display = 'none';
            
            if (currentSelectionType === 'theater') {
                document.getElementById('seatSelectionModal').style.display = 'flex';
                modalHistory.pop();
            } else if (currentSelectionType === 'restaurant') {
                document.getElementById('restaurantSelectionModal').style.display = 'flex';
                modalHistory.pop();
            } else if (currentSelectionType === 'coffee') {
                document.getElementById('coffeeSelectionModal').style.display = 'flex';
                modalHistory.pop();
            }
        }

        // Выбор способа оплаты
        function selectPaymentMethodNew(element, method) {
            document.querySelectorAll('.payment-top-block, .payment-side-block').forEach(el => {
                el.classList.remove('selected');
            });
            
            element.classList.add('selected');
            selectedPaymentMethod = method;
            
            if (method === 'card') {
                setTimeout(() => {
                    document.getElementById('paymentMethodModal').style.display = 'none';
                    document.getElementById('cardPaymentModal').style.display = 'flex';
                    modalHistory.push('cardPaymentModal');
                }, 300);
            }
        }

        // Обработка платежа
        function processPayment() {
            document.getElementById('cardPaymentModal').style.display = 'none';
            document.getElementById('successModal').style.display = 'flex';
            modalHistory.push('successModal');
        }

        // Показать окно подтверждения отмены
        function showCancelConfirmation(modalId) {
            currentModal = modalId;
            document.getElementById(modalId).style.display = 'none';
            document.getElementById('cancelConfirmationModal').style.display = 'flex';
        }

        // Закрыть окно подтверждения отмены
        function closeCancelConfirmation() {
            document.getElementById('cancelConfirmationModal').style.display = 'none';
            if (currentModal) {
                document.getElementById(currentModal).style.display = 'flex';
            }
        }

        // Назад к выбору способа оплаты
        function goBackToPaymentMethod() {
            document.getElementById('cardPaymentModal').style.display = 'none';
            document.getElementById('paymentMethodModal').style.display = 'flex';
            modalHistory.pop();
        }

        // Закрыть все модальные окна
        function closeAllModals() {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.style.display = 'none';
            });
            
            selectedSeats = [];
            selectedTable = null;
            selectedCoffeeTable = null;
            selectedPaymentMethod = null;
            currentModal = null;
            modalHistory = [];
            currentSelectionType = null;
            
            document.querySelectorAll('.seat').forEach(seat => {
                seat.classList.remove('selected');
            });
            
            document.querySelectorAll('.table-item').forEach(table => {
                table.classList.remove('selected');
            });
            
            document.querySelectorAll('.coffee-table-item, .coffee-side-table').forEach(table => {
                table.classList.remove('selected');
            });
            
            updateSelectedSeatsInfo();
            updateRestaurantSelectionInfo();
            updateCoffeeSelectionInfo();
        }

        window.addEventListener('popstate', function(event) {
            if (modalHistory.length > 1) {
                const current = modalHistory.pop();
                document.getElementById(current).style.display = 'none';
                
                const previous = modalHistory[modalHistory.length - 1];
                document.getElementById(previous).style.display = 'flex';
            } else if (modalHistory.length === 1) {
                closeAllModals();
            }
        });