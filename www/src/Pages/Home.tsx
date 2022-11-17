
import * as React from "react";
import { Button, Card, CardBody, CardGroup, CardImg, CardSubtitle, CardText, CardTitle, Col, Container, Form, FormGroup, FormText, Input, Label, Row } from "reactstrap";

import { useAuth } from "../hooks/useAuth";
import axios from 'axios';
import { SearchBase, SearchComponent, SearchBox } from '@appbaseio/react-searchbox';
import ReactPaginate from 'react-paginate';

function Home() {
   const { authed, loading, vote } = useAuth();

   const [data,setData] = React.useState([]);


   React.useEffect(() => {

   },[]);
   return <div className="home-content">
            <div className="context">
               <div className="area" >
                                    <ul className="circles">
                                          <li></li>
                                          <li></li>
                                          <li></li>
                                          <li></li>
                                          <li></li>
                                          <li></li>
                                          <li></li>
                                          <li></li>
                                          <li></li>
                                          <li></li>
                                    </ul>
                           </div >
            </div>
            <div>
            <Container style={{height:"70vh", overflow:"auto"}}>
               <Row>
                  <Col>
                  <SearchBase
                     transformRequest={(request)=>{
                        console.log('request',JSON.parse(request.body));
                        return Promise.resolve({
                           ...request
                        })
                     }}
                     index="default"
                     url="https://us-west-2.aws.data.mongodb-api.com/app/reactive-search-bimst/endpoint/http_endpoint/reactivesearch"
                     credentials="funkydemo:funkydemo"
                     mongodb={{
                        db: 'aerospace',
                        collection: 'notes'
                     }}
                     
                  >
                     <div>
                        <div className="row">
                           <div className="col">
                           <SearchBox
                              id="search-component"
                              index="default" 
                              dataField={["title"]}
                              includeFields={['notes','author.name','device','parameter','title','timeStamp']}
                              placeholder="Search for notes"
                              fuzziness={1}
                              autosuggest={true}
                              react={{
                                 and: ['search-component','facet-component','facet-component-2','facet-component-3']
                                 }}
                              />
                           </div>
                        </div>
                        <div className="row">
                        <div className="col">
                        <SearchComponent
                              title="Facet"
                              id="facet-component"
                              type="term"
                              react={{
                                 and: ['search-component','facet-component','facet-component-2','facet-component-3']
                                 }}
                              index="default"
                              dataField="author.name"
                              
                              aggregationSize={5}
                              includeFields={['notes','author.name','device','parameter','title','timeStamp']}
                              // To initialize with default value
                              value={[]}
                              render={({ aggregationData, loading, value, setValue }) => {
                              return (
                                 <div className="filter-container">
                                    <h3>Author</h3>
                                    {loading ? (
                                    <div>Loading Filters ...</div>
                                    ) : (
                                    aggregationData.data.map(item => (
                                       <div className="list-item" key={item._key}>
                                          <input
                                          type="checkbox"
                                          checked={value ? value.includes(item._key) : false}
                                          value={item._key}
                                          onChange={e => {
                                             const values = value || [];
                                             if (values && values.includes(e.target.value)) {
                                                values.splice(values.indexOf(e.target.value), 1);
                                             } else {
                                                values.push(e.target.value);
                                             }
                                             // Set filter value and trigger custom query
                                             setValue(values, {
                                                triggerDefaultQuery: false,
                                                triggerCustomQuery: true,
                                                stateChanges: true
                                             });
                                          }}
                                          />
                                          <label className="list-item-label" htmlFor={item._key}>
                                          {item._key} ({item._doc_count})
                                          </label>
                                       </div>
                                    ))
                                    )}
                                 </div>
                              );
                              }}
                           />
                           <SearchComponent
                              title="Facet"
                              id="facet-component-2"
                              type="term"
                              index="default"
                              dataField="parameter"
                              
                              aggregationSize={9}
                              includeFields={['notes','author.name','device','parameter','title','timeStamp']}
                              // To initialize with default value
                              value={[]}
                              react={{
                                 and: ['search-component','facet-component','facet-component-2','facet-component-3']
                                 }}
                              render={({ aggregationData, loading, value, setValue }) => {
                              return (
                                 <div className="filter-container">
                                    <h3>Parameter Types</h3>
                                    {loading ? (
                                    <div>Loading Filters ...</div>
                                    ) : (
                                    aggregationData.data.map(item => (
                                       <div className="list-item" key={item._key}>
                                          <input
                                          type="checkbox"
                                          checked={value ? value.includes(item._key) : false}
                                          value={item._key}
                                          onChange={e => {
                                             const values = value || [];
                                             if (values && values.includes(e.target.value)) {
                                                values.splice(values.indexOf(e.target.value), 1);
                                             } else {
                                                values.push(e.target.value);
                                             }
                                             // Set filter value and trigger custom query
                                             setValue(values, {
                                                triggerDefaultQuery: false,
                                                triggerCustomQuery: true,
                                                stateChanges: true
                                             });
                                          }}
                                          />
                                          <label className="list-item-label" htmlFor={item._key}>
                                          {item._key} ({item._doc_count})
                                          </label>
                                       </div>
                                    ))
                                    )}
                                 </div>
                              );
                              }}
                           />
                           <SearchComponent
                              title="Facet"
                              id="facet-component-3"
                              type="term"
                              index="default"
                              dataField="device"
                              
                              aggregationSize={9}
                              includeFields={['notes','author.name','device','parameter','title','timeStamp']}
                              // To initialize with default value
                              value={[]}
                              react={{
                                 and: ['search-component','facet-component','facet-component-2','facet-component-3']
                                 }}
                              render={({ aggregationData, loading, value, setValue }) => {
                              return (
                                 <div className="filter-container">
                                    <h3>Device Type</h3>
                                    {loading ? (
                                    <div>Loading Filters ...</div>
                                    ) : (
                                    aggregationData.data.map(item => (
                                       <div className="list-item" key={item._key}>
                                          <input
                                          type="checkbox"
                                          checked={value ? value.includes(item._key) : false}
                                          value={item._key}
                                          onChange={e => {
                                             const values = value || [];
                                             if (values && values.includes(e.target.value)) {
                                                values.splice(values.indexOf(e.target.value), 1);
                                             } else {
                                                values.push(e.target.value);
                                             }
                                             // Set filter value and trigger custom query
                                             setValue(values, {
                                                triggerDefaultQuery: false,
                                                triggerCustomQuery: true,
                                                stateChanges: true
                                             });
                                          }}
                                          />
                                          <label className="list-item-label" htmlFor={item._key}>
                                          {item._key} ({item._doc_count})
                                          </label>
                                       </div>
                                    ))
                                    )}
                                 </div>
                              );
                              }}
                           />
                        </div>
                        <div className="col">
                           <SearchComponent
                              id="result-component"
                              highlight
                              sortBy="desc"
                              dataField="timeStamp"
                              size={5}
                              includeFields={['notes','author.name','device','parameter','title','timeStamp']}
                              react={{
                              and: ['search-component','facet-component','facet-component-2','facet-component-3']
                              }}
                           >
                              {({ results, loading, size, setValue, setFrom }) => {
                                 console.log('results',results);
                                 let getURL = function (x){
                                    console.log('x',x);
                                    let d1 = String(x.timeStamp).split("+")[0];
                                    console.log('d1',d1);
                                    let path = String(window.location.href);
                                    return path+"dashboard?t="+encodeURIComponent(d1);
                                 };
                              return (
                                 <div className="result-list-container">
                                    {loading ? (
                                    <div>Loading Results ...</div>
                                    ) : (
                                    <div>
                                       {!results.data.length ? (
                                          <div>No results found</div>
                                       ) : (
                                          <p>
                                          {results.numberOfResults} results found in{' '}
                                          {results.time}
                                          ms
                                          </p>
                                       )}
                                       {results.data.map(item => (
                                          <div
                                          className="item-content text-left"
                                          key={item._id}
                                          style={{ 
                                             background: "rgba(255,255,255,0.6)",
                                             border: "5px solid white",
                                             marginTop:"10px",
                                             padding: 10 ,
                                             textAlign: "left"
                                          }}
                                          >
                                          
                                          <h5 style={{fontWeight:"bolder",fontSize:"0.9em"}}>{String(item.timeStamp).split('T')[0]} @ {String(item.timeStamp).split('T')[1]} <span className="tag device"><b>{item.device}</b></span><span className="tag"><b>{item.parameter}</b></span></h5>
                                          <h5><b>{item.title}</b> <a href={getURL(item)} target="_self">View Chart</a></h5>
                                          <p style={{fontWeight:"lighter"}}>
                                             {item.notes}
                                          </p>
                                          </div>
                                       ))}
                                    </div>
                                    )}
                                    <ReactPaginate
                                    pageCount={Math.floor(results.numberOfResults / size)}
                                    onPageChange={({ selected }) => setFrom(selected * size)}
                                    previousLabel="previous"
                                    nextLabel="next"
                                    breakLabel="..."
                                    breakClassName="break-me"
                                    marginPagesDisplayed={2}
                                    pageRangeDisplayed={5}
                                    breakLinkClassName="page-link"
                                    containerClassName="pagination"
                                    pageClassName="page-item"
                                    pageLinkClassName="page-link"
                                    previousClassName="page-item"
                                    previousLinkClassName="page-link"
                                    nextClassName="page-item"
                                    nextLinkClassName="page-link"
                                    activeClassName="active"
                                    />
                                 </div>
                              );
                              }}
                           </SearchComponent>
                        </div>
                        </div>
                     </div>
                  </SearchBase>
                  </Col>
               </Row>
               
            </Container>
                  
               
            </div>
         </div>;
}

export default Home;