/*
 * // Copyright (c) 2023 Anuj S and The Wired
 * //
 * // This program is free software: you can redistribute it and/or modify
 * // it under the terms of the GNU General Public License as published by
 * // the Free Software Foundation, either version 3 of the License, or
 * // (at your option) any later version.
 * //
 * // This program is distributed in the hope that it will be useful,
 * // but WITHOUT ANY WARRANTY; without even the implied warranty of
 * // MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * // GNU General Public License for more details.
 * //
 * // You should have received a copy of the GNU General Public License
 * // along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 */

import {
	Box,
	Button,
	Center,
	Heading,
	Table,
	TableContainer,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
} from '@chakra-ui/react';
import React from 'react';
import DashboardCard from '../../custom-components/DashboardCard';
import PendingApprovals from '../dashboard/pending-approvals';

const REGISTRAR = () => {
	return (
		<>
			<DashboardCard>
				<Heading size={'sm'}>Dean&apos;s Absences</Heading>
				<Center flexGrow={1}>
					<Heading>0</Heading>
				</Center>
			</DashboardCard>
			<DashboardCard>
				<Heading size={'sm'}>HOD&apos;s Absences</Heading>
				<Center flexGrow={1}>
					<Heading>0</Heading>
				</Center>
			</DashboardCard>
			<DashboardCard>
				<Heading size={'sm'}>Staff&apos;s Absences</Heading>
				<Center flexGrow={1}>
					<Heading>0</Heading>
				</Center>
			</DashboardCard>

			<PendingApprovals />
			<DashboardCard
				_hover={{
					transform: 'none',
				}}
				colSpan={1}
				colStart={4}
				rowStart={1}
				rowEnd={6}
				h={'full'}
				overflow={'auto'}
			>
				<Heading
					size={'md'}
					pb={3}
				>
					Approved Today
				</Heading>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit.
				Aliquid asperiores dolor laboriosam minus possimus, praesentium
				reprehenderit repudiandae sapiente voluptas voluptatum? Ad,
				pariatur quos? At delectus enim fugit, illum ipsam, minima modi
				mollitia nobis nulla odio porro provident quam quia quisquam
				repellendus sint sit sunt ut? A accusantium aperiam atque
				consectetur consequatur consequuntur debitis distinctio
				doloremque, ducimus earum eius esse excepturi exercitationem
				explicabo, fuga ipsam iusto, laborum obcaecati provident quasi
				quos rerum tempora vel velit veniam! Ad, architecto dolore
				dolorum ea eligendi hic impedit incidunt iste libero mollitia
				officia quasi qui quidem repellendus sapiente suscipit totam ut
				voluptates? Ab animi dolores eveniet explicabo in ipsum, maiores
				vitae? Aperiam corporis enim eum eveniet fuga incidunt ipsam,
				maiores modi mollitia odio optio, perferendis quae qui quidem
				sit soluta ut? A aliquid, assumenda deleniti distinctio eveniet
				expedita ipsum iusto nihil odit, repudiandae ullam voluptates!
				Aspernatur atque consectetur debitis dicta dolore dolorum
				ducimus est facere harum incidunt iusto libero neque nesciunt
				obcaecati, provident quaerat quis repellendus sequi voluptas
				voluptate? Adipisci aperiam aspernatur at corporis deserunt
				distinctio ducimus, ea facilis id illo impedit in inventore
				laboriosam modi mollitia, necessitatibus possimus quaerat quas
				qui quo repellat reprehenderit rerum sed sequi tenetur.
				Aspernatur aut debitis doloremque id impedit nihil numquam
				praesentium ratione repudiandae vel! Amet aperiam aut commodi
				corporis cupiditate ducimus ea, eaque eveniet expedita hic ipsum
				iste, iure laudantium minima nobis placeat quos sapiente
				suscipit veniam voluptate. A, architecto blanditiis cupiditate
				ea excepturi exercitationem id, ipsum iure nostrum nulla
				perferendis quos repellendus ut? Animi beatae commodi error
				facere illum nemo non quo, voluptate. Earum error modi nam omnis
				reiciendis velit? Ad animi asperiores cumque debitis delectus
				deleniti dolores eos expedita facilis fugit ipsa maiores minus
				natus necessitatibus nulla numquam, quaerat quas quasi qui
				recusandae, repellendus reprehenderit ut veritatis vero vitae?
				Dolore et exercitationem laborum quisquam sint voluptates.
				<Box></Box>
			</DashboardCard>
		</>
	);
};

export default REGISTRAR;
