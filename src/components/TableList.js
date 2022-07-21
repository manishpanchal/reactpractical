function TableList(props) {
  const lists = props.listItems;
  const listItems = lists.map((list, i) =>
    <tr key={'key' + list.id}>
      <td>{list.name}</td>
      <td>{list.color}</td>
      <td>
        <button className='btn-edit mr-10' onClick={() => props.handleActionButtons(i, "update")}>Edit</button>
        <button className='btn-delete mr-10' onClick={() => props.handleActionButtons(i, "delete")}>Delete</button>
      </td>
    </tr>
  );
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Color</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {listItems}
      </tbody>
    </table>

  );
}
export default TableList;